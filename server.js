const {title, text} = req.body;
  if (title && text) {
      const newNote = {
          title,
          text,
          id: uuid.v4(),
      };
      JSONnotes.push(newNote);
      fs.writeFileSync('./db/db.json', JSON.stringify(JSONnotes, null, 4));
      res.json(JSONnotes);
  }

app.delete('/api/notes/:id', (req, res) => {
  const noteID = req.params.id;
  const deleteThisNote = JSONnotes.find((note) => note.id === noteID);
  JSONnotes.splice(deleteThisNote, 1);
  fs.writeFileSync('./db/db.json', JSON.stringify(JSONnotes, null, 4));
  res.json(JSONnotes);
});

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});