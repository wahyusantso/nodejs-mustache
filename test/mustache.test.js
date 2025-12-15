import mustache from "mustache";

test('Menggunakan Mustache', () => {
    //parameter 1: data template.
    //parameter 2: data yang dimasukan ke template.
    const data = mustache.render('Hello {{name}}', {name: "Renyui"});
    expect(data).toBe('Hello Renyui');
});