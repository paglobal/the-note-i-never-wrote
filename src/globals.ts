import { adaptState } from "promethium-js";
import note from "./note";
import dontGiveUpOnMe from "./assets/music/Andy Grammer - Don't Give Up On Me (Lyrics).mp3";
import { Howl } from "howler";

export const [isPlaying, setIsPlaying] = adaptState(false);

let cursor = 0;
let currentNoteSegmentIndex = 0;
let segmentWaitTime = 1500;
let letterWaitTime = 70;
let currentNoteSegment = note[currentNoteSegmentIndex];
let animationDuration = 600;

export const [displayText, setDisplayText] = adaptState("");

export function type() {
  if (isPlaying()) proceed();

  function proceed() {
    if (cursor === currentNoteSegment.length) {
      cursor = 0;
      if (currentNoteSegmentIndex === note.length - 1) {
        currentNoteSegmentIndex = 0;
      } else {
        currentNoteSegmentIndex++;
      }
      currentNoteSegment = note[currentNoteSegmentIndex];
      setTimeout(() => {
        if (isPlaying()) {
          setDisplayText("");
          type();
        } else {
          currentNoteSegmentIndex--;
          currentNoteSegment = note[currentNoteSegmentIndex];
          cursor = currentNoteSegment.length;
        }
      }, segmentWaitTime);
    } else {
      let letter = currentNoteSegment[cursor];
      setDisplayText(displayText() + letter);
      cursor++;
      setTimeout(type, letterWaitTime);
    }
  }
}

export const [loadedMusic, setLoadedMusic] = adaptState(false);

export const song = new Howl({
  src: [dontGiveUpOnMe],
  html5: true,
  preload: true,
});

song.once("load", () => {
  setLoadedMusic(true);
});

song.on("end", () => {
  song.play();
});
