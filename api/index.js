import fs from "fs";
import path from "path";

export default function (req, res, next) {
  const dir = path.join("./static/media", req.query.p);
  console.log({ dir });
  let stat = fs.lstatSync(dir);
  console.log({ dir, isFile: stat.isFile() });
  const handleFile = (f, fpath) => {
    console.log({ handleFile: { f, fpath } });
    if (f.toLowerCase().endsWith(".mp4")) {
      return {
        type: 'mp4',
        size: stat.size,
        name: f,
        path: fpath
      }
    }
    if (f.toLowerCase().endsWith(".wtt")) {
      const fn = f.slice(0, -4).split("-");
      return {
        type: 'wtt',
        size: stat.size,
        name: fn[0],
        label: fn.length > 1 ? fn[1] : fn[0],
        path: fpath
      }
    }
    return {
      type: "file",
      size: stat.size,
      name: f,
      path: fpath
    }
  }
  if (stat.isFile()) {
    return res.json([handleFile(path.basename(req.query.p), req.query.p)]);
  }
  const files = fs.readdirSync(dir);
  res.json(files.map(f => {
    stat = fs.lstatSync(path.join(dir, f));
    if (f.startsWith(".")) {
      return null;
    }
    if (stat.isDirectory()) {
      return {
        type: 'dir',
        name: f,
        path: path.join(req.query.p, f)
      }
    }
    return handleFile(f, path.join(req.query.p, f));
  }).filter(f => !!f));
}
