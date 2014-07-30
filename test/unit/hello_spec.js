define(['hello'], function(hello) {
  describe('hello', function() {

    it('hello should be true', function() {
      expect(hello()).toBe("hello, world");
    });

  });
});
