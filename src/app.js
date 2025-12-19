import express from 'express';
import mustache from 'mustache';
import fs from 'fs/promises';

const app = express();

app.get('/graph', async (req, res) => {
    const template = await fs.readFile('./templates/graph.mustache')
                    .then((data) => data.toString());
        
    const data = mustache.render(template, {
        title: 'Graph Production',
        categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023],
        data: [16, 361, 1018, 2025, 3192, 4673, 5200]
    });

    return res.status(200).send(data);
});


app.listen(3000, () => {
    console.info('running on port 3000');
});