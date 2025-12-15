import mustache from "mustache";

test('Menggunakan Mustache', () => {
    //parameter 1: data template.
    //parameter 2: data yang dimasukan ke template.
    const data = mustache.render('Hello {{name}}', {name: "Renyui"});
    expect(data).toBe('Hello Renyui');
});

test('Menggunakan Mustache Cache', () => {
    mustache.parse('Hello {{name}}'); //compile template terlebih dahulu, untuk mempercepat proses ketika akan di render

    const data = mustache.render('Hello {{name}}', {name: "Renyui"});
    expect(data).toBe('Hello Renyui');
});

test('Tags', () => {
    //gunakan kurung kurawa 3 kali, untuk menampilkan code html pada data template
    const data = mustache.render('Hello {{name}}, my last name is {{{lastname}}}', {name: "Renyui", lastname: "<b>Sueb</b>"});
    expect(data).toBe('Hello Renyui, my last name is <b>Sueb</b>');
});

test('Nested Object', () => {
    //mengakses nested object pada data template
    const data = mustache.render('My Hobby is {{person.hobby}}', {
        person: {
            hobby: 'Drawing'
        }
    });
    expect(data).toBe('My Hobby is Drawing');
});