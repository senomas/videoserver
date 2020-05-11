import fs from "fs";
import path from "path";

export default function (req, res, next) {
  const dir = path.join("./static/media", req.query.p);
  console.log({ dir });
  let stat = fs.lstatSync(dir);
  console.log({ dir, isFile: stat.isFile() });
  if (stat.isFile()) {
    if (dir.toLowerCase().endsWith(".mp4")) {
      return res.json([{
        type: 'mp4',
        size: stat.size,
        name: dir
      }]);
    }
    return res.json([]);
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
        name: path.join(req.query.p, f)
      }
    }
    if (f.toLowerCase().endsWith(".mp4")) {
      return {
        type: 'mp4',
        size: stat.size,
        name: path.join(req.query.p, f)
      }
    }
    return null;
  }).filter(f => !!f));
}
