describe("Tranclite", function () {

  it("абв should be abv", function () {    
    expect(trns.transliterate('абв')).toEqual("abv");    
  });

 it("Кот should be Kot", function () {
    expect(trns.transliterate("Кот")).toEqual("Kot");
  });
    
});