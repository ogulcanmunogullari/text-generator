import { FC, useEffect, useState } from "react"
import axios from "axios"

const App: FC = () => {
  const [data, setData] = useState<string>()
  const [paragraph, setParagraph] = useState<number>(1)
  const [includeHTML, setIncludeHTML] = useState<boolean>(false)
  const getData = async (includeHTML: boolean, paragraph: number) => {
    const res = await axios(
      `https://baconipsum.com/api/?type=all-meat&paras=${paragraph}&format=${
        includeHTML ? "html" : "text"
      }`,
    )
    const data = await res.data
    console.log(data)
    setData(data)
  }
  useEffect(() => {
    getData(includeHTML, paragraph)
  }, [includeHTML, paragraph])
  useEffect(() => {
    getData(includeHTML, paragraph)
  }, [])
  return (
    <div className="container mx-auto bg-gray-900 text-white">
      <header>
        <h1>React Sample Text Generator</h1>
        <section className="flex flex-row justify-between">
          <div className="flex flex-col">
            <label htmlFor="numberOfParagraphs">Number Of Paragraphs</label>
            <input
              id="numberOfParagraphs"
              type="number"
              min={1}
              value={paragraph}
              onChange={(e) => setParagraph(Number(e.target.value))}
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="HTML">Include HTML</label>
            <input
              type="checkbox"
              onChange={(e) => setIncludeHTML(e.target.checked)}
              id="HTML"
              className=""
            />
          </div>
        </section>
      </header>

      <article className="flex flex-col gap-1">
        {data?.split("\n").map((p, index) => {
          return <div key={index}>{`${p}`}</div>
        })}
      </article>
    </div>
  )
}

export default App
