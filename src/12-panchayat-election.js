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
  const votes = {}
  const registerVoters = new Set();

  function registerVoter(voter) {

    if (!voter || typeof voter !== 'object') return false;

    let { name, id, age } = voter;

    if (!name || !id || !age) return false;

    if (age < 18) return false;

    if (registerVoters.has(id)) return false

    registerVoters.add(id)
    return true;
  }


  function castVote(voterId, candidateId, onSuccess, onError) {

    if (!registerVoters.has(voterId)) return onError("Voter not registered");

    if (!candidates.some((item) => item.id === candidateId)) return onError("Candidate does not exist");

    if (votes[voterId]) return onError("Voter has already voted");

    votes[voterId] = candidateId;
    return onSuccess({ voterId, candidateId })



  }

  function getResults(sortFn) {


    let result = candidates.map((item) => {

      let votesCount = Object.values(votes).filter((innerItem) => innerItem === item.id).length;




      return {
        ...item,
        votes: votesCount
      }
    })

    if (sortFn) {
      result.sort(sortFn)
    } else {
      result.sort((a, b) => b.votes - a.votes)
    }

    return result

  }

  function getWinner() {
    let win = this.getResults();

    if (win.length === 0 || win[0].votes === 0) return null

    return win[0]
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner
  }

}

export function createVoteValidator(rules) {

  return function x(item) {

    let isValid = true;


    if (Object.keys(item).length !== rules.requiredFields.length || item.age < rules.minAge) isValid = false;


    return {
      valid: isValid,
      reason: "reason"
    }
  }
}

export function countVotesInRegions(regionTree) {
  if (regionTree === null || !regionTree) return 0

  let totalVote = regionTree.votes;

  if (Array.isArray(regionTree.subRegions)) {
    for (const subRegion of regionTree.subRegions) {
      totalVote += countVotesInRegions(subRegion)
    }
  }

  return totalVote
}

export function tallyPure(currentTally, candidateId) {
  return {
    ...currentTally,
    [candidateId]: (currentTally[candidateId] || 0) + 1
  }
}
