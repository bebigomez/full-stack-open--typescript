import { useEffect, useState } from 'react'
import { createEntry, getAllEntries } from './diaryService'
import { DiaryEntry } from './types'
import { Entry as EntryComponent } from './components/Entry'
import { Notification } from './components/Notification'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllEntries().then(data =>
      setEntries(data))
  }, [])

  const resetInputs = () => {
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd = { date, visibility, weather, comment };
    createEntry(entryToAdd)
      .then(data => {
        setEntries(entries.concat(data));
        resetInputs()
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.log(error)
          setNotification(error.response.data);
          setTimeout(() => {
            setNotification('');
          }, 3000);
        }
      });
  };

  return (
    <>
      <h1>Diary Entries</h1>
      <Notification message={notification} />
      <form onSubmit={addEntry}>
        <div>
          date:
          <input
            type='date'
            value={date}
            onChange={(event) => { setDate(event.target.value) }}
          />
        </div>

        <div>
          <strong>visibility:</strong>  great <input type="radio" name="visibility" onChange={() => setVisibility('great')} />
          good <input type="radio" name="visibility" onChange={() => setVisibility('good')} />
          ok <input type="radio" name="visibility" onChange={() => setVisibility('ok')} />
          poor <input type="radio" name="visibility" onChange={() => setVisibility('poor')} />
        </div>

        <div>
        <strong>weather:</strong> sunny <input type="radio" name="weather" onChange={() => setWeather('sunny')} />
          rainy <input type="radio" name="weather" onChange={() => setWeather('rainy')} />
          cloudy <input type="radio" name="weather" onChange={() => setWeather('cloudy')} />
          windy <input type="radio" name="weather" onChange={() => setWeather('windy')} />
          stormy <input type="radio" name="weather" onChange={() => setWeather('stormy')} />
        </div>

        <div>
          comment:
          <input
            value={comment}
            onChange={(event) => { setComment(event.target.value) }}
          />
        </div>
        <button>add entry</button>
      </form>
      {entries.map(entry => {
        return (
          <EntryComponent key={entry.id} entry={entry} />
        )
      })}
    </>
  )
}

export default App
