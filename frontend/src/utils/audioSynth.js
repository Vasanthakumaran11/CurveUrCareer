/**
 * Web Audio API based Synthesizer for CurveUrCareer
 * Generates beautiful, futuristic synthesizer sounds programmatically without asset overhead.
 */

class AudioSynth {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  createOscillator(type, freq, duration, gainStart, gainEnd = 0.001) {
    this.init();
    if (this.isMuted) return null;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gainNode.gain.setValueAtTime(gainStart, this.ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(gainEnd, this.ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    return { osc, gainNode };
  }

  /**
   * Short sleek click sound for UI interactions
   */
  playTap() {
    try {
      const synth = this.createOscillator('sine', 880, 0.08, 0.08);
      if (!synth) return;
      synth.osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);
      synth.osc.start();
      synth.osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }

  /**
   * Quick futuristic double ping for puzzle successes
   */
  playPuzzleCorrect() {
    try {
      this.init();
      if (this.isMuted) return;
      
      const now = this.ctx.currentTime;
      
      // First high ping
      const synth1 = this.createOscillator('sine', 1200, 0.15, 0.05);
      if (synth1) {
        synth1.osc.start(now);
        synth1.osc.stop(now + 0.15);
      }

      // Second higher ping slightly delayed
      setTimeout(() => {
        const synth2 = this.createOscillator('sine', 1600, 0.25, 0.06);
        if (synth2) {
          synth2.osc.start(this.ctx.currentTime);
          synth2.osc.stop(this.ctx.currentTime + 0.25);
        }
      }, 70);
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }

  /**
   * Gentle, sweeping sound for step transitions
   */
  playTransition() {
    try {
      this.init();
      if (this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gainNode = this.ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';

      // Ambient low-to-mid harmony
      osc1.frequency.setValueAtTime(220, now);
      osc1.frequency.exponentialRampToValueAtTime(440, now + 0.6);
      
      osc2.frequency.setValueAtTime(330, now);
      osc2.frequency.exponentialRampToValueAtTime(660, now + 0.6);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 0.4);

      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }

  /**
   * Beautiful major pentatonic rising arpeggio chord for completed journey
   */
  playSuccess() {
    try {
      this.init();
      if (this.isMuted) return;

      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // C major pentatonic notes (C4, E4, G4, C5, E5, G5)
      
      notes.forEach((freq, index) => {
        setTimeout(() => {
          const synth = this.createOscillator('triangle', freq, 0.8, 0.05);
          if (synth) {
            synth.osc.start(this.ctx.currentTime);
            synth.osc.stop(this.ctx.currentTime + 0.8);
          }
        }, index * 100);
      });
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }

  /**
   * Gentle, soft alert sweep
   */
  playFailure() {
    try {
      this.init();
      if (this.isMuted) return;

      const now = this.ctx.currentTime;
      const synth = this.createOscillator('sine', 330, 0.4, 0.1);
      if (synth) {
        synth.osc.frequency.linearRampToValueAtTime(220, now + 0.4);
        synth.osc.start(now);
        synth.osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn('Audio synth error:', e);
    }
  }
}

export const audioSynth = new AudioSynth();
