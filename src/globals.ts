import { adaptState } from "promethium-js";
import note from "./note";
import dontGiveUpOnMe from "./assets/music/Andy Grammer - Don't Give Up On Me.mp3";
import { Howl } from "howler";

export const isPlaying = adaptState(false);

let cursor = 0;
let currentNoteSegmentIndex = 0;
let segmentWaitTime = 1500;
let letterWaitTime = 70;
let currentNoteSegment = note[currentNoteSegmentIndex];

export const displayText = adaptState("");

export function type() {
  if (isPlaying.value) proceed();

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
        if (isPlaying.value) {
          displayText.set("");
          type();
        } else {
          currentNoteSegmentIndex--;
          currentNoteSegment = note[currentNoteSegmentIndex];
          cursor = currentNoteSegment.length;
        }
      }, segmentWaitTime);
    } else {
      let letter = currentNoteSegment[cursor];
      displayText.set(displayText.value + letter);
      cursor++;
      setTimeout(type, letterWaitTime);
    }
  }
}

export const loadedMusic = adaptState(false);

export const song = new Howl({
  src: [dontGiveUpOnMe],
  preload: true,
});

song.once("load", () => {
  loadedMusic.set(true);
});

song.on("end", () => {
  song.play();
});

song.load();

let started = false;

export function playPause() {
  if (!started) {
    isPlaying.set(true);
    setTimeout(() => {
      type();
    }, 1000);
  } else {
    isPlaying.set(!isPlaying.value);
    if (isPlaying.value) {
      type();
      song.play();
    } else {
      song.pause();
    }
  }
  if (!started) {
    song.play();
    started = true;
  }
}

document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    playPause();
  }
};
