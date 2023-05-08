import { getTagValue } from "./dbfuncs.js"

//Hashtable, used for retrieving values for tags
class HashTable {
    constructor() {
        this.table = new Array(127)
        this.size = 0
    }

    hash(key) {
        let hash = 0
        for(let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % this.table.length
    }

    set(key, value) {
        const index = this.hash(key)
        if(this.table[index]) {
            for(let i = 0; i < this.table[index].length; i++) {
                if(this.table[index][i][0] === key) {
                    this.table[index][i][1] = value
                    return
                }
            }
            this.table[index].push([key, value])
        } else {
            this.table[index] = []
            this.table[index].push([key, value])
        }
        this.size++
    }

    get(key) {
        const target = this.hash(key)
        if(this.table[target]) {
            for(let i = 0; i < this.table.length; i++) {
                if(this.table[target][i][0] === key) {
                    return this.table[target][i][1]
                }
            }
        }
        return undefined
    }
}

//Algorithm, finds three highest scores
export const algorithm = async(userId, sights) => {

    const ht = new HashTable()
    const values = await getTagValue(userId)
    //console.log(values)
    for(let i = 0; i < values.length; i++) {
      ht.set(values[i].tag_id, values[i].value)
    }
   // console.log(ht.get('fcde0ef4-3083-4898-821f-2f5a1893a25c'))
  
    const similarities = []
    let similarity = 0
  
    for(let i = 0; i < sights.length; i++) {
      for(let j = 0; j < sights[i].sub_tags.length; j++) {
        const tagId = sights[i].sub_tags[j].tag_id
        const value = ht.get(tagId)
        similarity += value
      }
      similarity += ht.get(sights[i].main_tag_id)*1.5
      similarity = similarity/(sights[i].sub_tags.length+1)
      similarities.push([sights[i], similarity])
      similarity = 0
    }
  
    similarities.sort((a, b) => b[1] - a[1]);
    return [similarities[0][0], similarities[1][0], similarities[2][0]]
  
  }