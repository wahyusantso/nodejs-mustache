import mustache from "mustache";
import fs from "fs/promises";

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

test('Mustache File', async () => {
    const template = await fs.readFile('./templates/hello.mustache') //baca file
                        .then((data) => data.toString()); //covert ke string, karena data berupa buffer
    
        const data = mustache.render(template, { //gunakan template yang sudah dibaca
            title: "Ricard"
        });
        console.info(data);
        expect(data).toContain('Ricard');
});

//menggunakan section pada template jika ingin menerapkan logic seperti ifs
test('Mustache Section Not Show', async () => {
    const template = await fs.readFile('./templates/person.mustache') //baca file
                        .then((data) => data.toString()); //covert ke string, karena data berupa buffer
    
        const data = mustache.render(template, {}); //data didalam blok section tidak akan ditampilkan, karena tidak menammbhkan data pada proses ini.
        console.info(data);
        expect(data).not.toContain('Hello Person.');
});

test('Mustache Section Show', async () => {
    const template = await fs.readFile('./templates/person.mustache') //baca file
                        .then((data) => data.toString()); //covert ke string, karena data berupa buffer
    
        const data = mustache.render(template, {person: "Andrew"}); //selama ada data yang dikirim ke section maka data yang didalam block ditampilkan
        console.info(data);
        expect(data).toContain('Hello Person.');
});

test('Mustache Section Data', async () => {
    const template = await fs.readFile('./templates/person.mustache') //baca file
                        .then((data) => data.toString()); //covert ke string, karena data berupa buffer
    
        const data = mustache.render(template, { //dapat menggunakan objeck data langsung {{ name }} pada template tanpa harus memanggil sectionnya {{ person.name }}
            person: {
                name: "Ricards"
            } 
        });
        console.info(data);
        expect(data).toContain('Hello Person Ricards');
});

//Inverted Section {{ ^person }} logika else
test('Inverted Section', async () => {
    const template = await fs.readFile('./templates/person.mustache') //baca file
                        .then((data) => data.toString()); //covert ke string, karena data berupa buffer
    
        const data = mustache.render(template, {}); //tidak mengirim data, agar login else dijalankan
        console.info(data);
        expect(data).toContain('Hello Guest');
});

test('List', async () => {
    const template = await fs.readFile('./templates/hobbies.mustache') //baca file
                        .then((data) => data.toString()); //covert ke string, karena data berupa buffer
    
        const data = mustache.render(template, {
            hobbies: ['Coding', 'Watching', 'Gaming'] //parsing data array ke section
        });
        console.info(data);
        expect(data).toContain('Coding');
        expect(data).toContain('Watching');
        expect(data).toContain('Gaming');
});