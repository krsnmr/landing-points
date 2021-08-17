describe("Moment Data", function () {
    var ar= [
        new moment('2021.08.12 12:00'),
        new moment('2021.08.12 15:00'), 
        new moment('2021.08.12 18:00'), 
        new moment('2021.08.12 21:00'),
        new moment('2021.08.13 00:00'),
        new moment('2021.08.13 03:00')
    ];

    var dt1 = moment.unix(1627868295);

    beforeEach(function () {
        
    });


    it("ar[3] - 12-08-21 21:00", function () {
        expect(ar[3].format("DD-MM-YY HH:mm")).toEqual('12-08-21 21:00');
    });

    it("ar[0-3] - val 210812 ar[4-5] - val 210813", function () {
        expect(ar[0].format("YYMMDD")).toEqual('210812');
        expect(ar[1].format("YYMMDD")).toEqual('210812');
        expect(ar[2].format("YYMMDD")).toEqual('210812');
        expect(ar[3].format("YYMMDD")).toEqual('210812');
        expect(ar[4].format("YYMMDD")).toEqual('210813');
        expect(ar[5].format("YYMMDD")).toEqual('210813');
    });

    it("1627868295 - 02-08-21 04:38", function () {
        expect(dt1.format("DD-MM-YY HH:mm")).toEqual('02-08-21 04:38');
    });


    
});