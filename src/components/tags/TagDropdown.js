import { useEffect, useState } from "react"
import { getTags } from "../../repositories/TagsRepository"

export const Tag_Dropdown = () => {
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            getTags()
            .then(setTags)
        },
        []
    )

    return (
       <>
          <select value={0}>
            <option value={0}>Tags</option>
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.label}
              </option>
            ))}
          </select>
       </>
    )
}