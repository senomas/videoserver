import fs from "fs";
import path from "path";

export default function (req, res, next) {
  const dir = path.join("./static/media", req.url);
  let stat = fs.lstatSync(dir);
  console.log({ dir, isFile: stat.isFile() });
  if (stat.isFile()) {
    if (dir.toLowerCase().endsWith(".mp4")) {
      return res.json([{
        type: 'mp4',
        size: stat.size,
        name: req.url
      }]);
    }
    return res.json([]);
  }
  const files = fs.readdirSync(dir);
  res.json(files.map(f => {
    stat = fs.lstatSync(path.join(dir, f));
    if (stat.isDirectory()) {
      return {
        type: 'dir',
        name: path.join(req.url, f)
      }
    } else if (f.toLowerCase().endsWith(".mp4")) {
      return {
        type: 'mp4',
        size: stat.size,
        name: path.join(req.url, f)
      }
    }
    return null;
  }).filter(f => !!f));
}
