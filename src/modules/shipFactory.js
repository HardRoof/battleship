function shipFactory(length, boatName, timeHit = 0) {
  return {
    length,
    boatName,
    timeHit,
    sank: false,
    hit() {
      if (this.timeHit < this.length) this.timeHit += 1;
      if (this.timeHit === this.length) this.hasSunk();
    },
    hasSunk() {
      this.sank = true;
    },
  };
}

export default shipFactory;
