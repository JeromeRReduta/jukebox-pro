import express from "express";
const router = express.Router();
export default router;

import { getTracks, getTrackById } from "#db/queries/tracks";
import { getPlaylistsByTrackIdAndUserId } from "#db/queries/playlists";
import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  console.log("ID IS RUNNING");

  const track = await getTrackById(+req.params.id);
  console.log("track here is", track);
  if (!track) {
    return res.status(404).send("Track not found.");
  }
  req.track = track;
  console.log("req track here is", req.track);
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.track);
});

router.use(requireUser);
router.route("/:id/playlists").get(async (req, res) => {
  console.log("req.track is", req.track);
  const playlists = await getPlaylistsByTrackIdAndUserId(
    +req.track.id,
    +req.user.id
  );
  if (!playlists) {
    return res.status(404).send("Track not found.");
  }
  return res.send(playlists);
});
