define(['hello2'], function(hello2) {
  describe("hello2", function() {
    it("will return name of freewind", function() {
      expect(hello2.name).toBe("freewind");
    });
  });
});
