/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  //  *   1. createElection(candidates)
  //  *      - CLOSURE: private state (votes object, registered voters set)
  //  *      - candidates: array of { id, name, party }
  //  *      - Returns object with methods:
  //  *
  //  *      registerVoter(voter)
  //  *        - voter: { id, name, age }
  //  *        - Add to private registered set. Return true.
  //  *        - Agar already registered or voter invalid, return false.
  //  *        - Agar age < 18, return false.
  //  *
  //  *      castVote(voterId, candidateId, onSuccess, onError)
  //  *        - CALLBACKS: call onSuccess or onError based on result
  //  *        - Validate: voter registered? candidate exists? already voted?
  //  *        - If valid: record vote, call onSuccess({ voterId, candidateId })
  //  *        - If invalid: call onError("reason string")
  //  *        - Return the callback's return value
  //  *
  //  *      getResults(sortFn)
  //  *        - HOF: takes optional sort comparator function
  //  *        - Returns array of { id, name, party, votes: count }
  //  *        - If sortFn provided, sort results using it
  //  *        - Default (no sortFn): sort by votes descending
  //  *
  //  *      getWinner()
  //  *        - Returns candidate object with most votes
  //  *        - If tie, return first candidate among tied ones
  //  *        - If no votes cast, return null

  const _candidates = candidates.map(candidat => ({ ...candidat, votes: [] }))
  const _voters = []

  const registerVoter = (voter) => {

    const isInvalid = typeof voter !== "object"
      || Array.isArray(voter) || voter === null || !voter.hasOwnProperty("age")
      || typeof voter.age !== "number" || voter.age < 18

    if (isInvalid) return false

    if (_voters.some(v => v.id === voter.id))
      return false

    _voters.push({ ...voter, voted: false })
    return true
  }

  const castVote = (voterId, candidateId, onSuccess, onError) => {
    const candidat = _candidates.find(c => c.id === candidateId)
    const voter = _voters.find(v => v.id === voterId)

    if (voter === undefined || candidat === undefined)
      return onError("voter or candidate not registred")

    if (voter.voted)
      return onError("already voted")

    candidat.votes.push(voterId)
    voter.voted = true
    return onSuccess({ candidateId })
  }

  const getResults = (sortFn) => {
    let result = structuredClone(_candidates.map(c => ({ ...c, votes: c.votes.length })))

    if (result.length === 0) return []

    const callback = typeof sortFn === "function"
      ? sortFn
      : (a, b) => b.votes - a.votes

    return result.sort(callback)
  }

  const getWinner = () => {
    const sortedCandidates = _candidates.sort((a, b) => {
      const voteCountA = a.votes.length
      const voteCountB = b.votes.length

      return voteCountB - voteCountA
    })

    if (sortedCandidates[0].votes.length === 0) return null

    return structuredClone(sortedCandidates.shift())
  }

  return { registerVoter, castVote, getResults, getWinner }
}

export function createVoteValidator(rules) {
  //  *   2. createVoteValidator(rules)
  //  *      - FACTORY: returns a validation function
  //  *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
  //  *      - Returned function takes a voter object and returns { valid, reason }

  return (voter) => {

    for (const required of rules.requiredFields) {
      if (!voter.hasOwnProperty(required)) {
        return { valid: false, reason: "required fields missing" }
      }
    }

    if (voter.age < rules.minAge) {
      return { valid: false, reason: `voter age must be greater than ${rules.minAge}` }
    }

    return { valid: true, reason: "valid voter" }
  }
}

export function countVotesInRegions(regionTree) {
  //  *   3. countVotesInRegions(regionTree)
  //  *      - RECURSION: count total votes in nested region structure
  //  *      - regionTree: { name, votes: number, subRegions: [...] }
  //  *      - Sum votes from this region + all subRegions (recursively)
  //  *      - Agar regionTree null/invalid, return 0

  if (typeof regionTree !== "object" || regionTree === null)
    return 0

  let totalVotes = regionTree.votes

  if (Array.isArray(regionTree.subRegions)
    && regionTree.subRegions.length > 0) {
    for (const r of regionTree.subRegions) {
      totalVotes += countVotesInRegions(r)
    }
  }

  return totalVotes
}

export function tallyPure(currentTally, candidateId) {
  //  *   4. tallyPure(currentTally, candidateId)
  //  *      - PURE FUNCTION: returns NEW tally object with incremented count
  //  *      - currentTally: { "cand1": 5, "cand2": 3, ... }
  //  *      - Return new object where candidateId count is incremented by 1
  //  *      - MUST NOT modify currentTally
  //  *      - If candidateId not in tally, add it with count 1

  if (Object.keys(currentTally).length === 0) {
    return { [candidateId]: 1 }
  }

  const tallyCopy = structuredClone(currentTally)

  if (!tallyCopy.hasOwnProperty(candidateId)) {
    return { ...tallyCopy, [candidateId]: 1 }
  }

  for (const key of Object.keys(tallyCopy)) {
    if (key === candidateId) {
      tallyCopy[key] += 1
      break
    }
  }

  return tallyCopy
}
