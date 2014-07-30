describe('input', function() {
	it('should update the label aside', function() {
		browser.get('http://localhost:8081/public/index.html');
		var nameInput = element(by.model('name'));
		nameInput.clear();
		nameInput.sendKeys('test-value');
		expect(element(by.binding('name')).getText()).toEqual("test-value");
	});
});