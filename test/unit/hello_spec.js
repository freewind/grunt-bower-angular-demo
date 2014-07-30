define(['hello'], function(he) {
  describe('hello', function() {

    it('hello should be true', function() {
      expect(he()).toBe("hello, world");
    });

  });
});
