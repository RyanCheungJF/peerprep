import { ormGetAllScoresForUser as _getUserScores } from '../model/review-orm.js'

const generateZeroArray = (len) => {
  return Array.from(Array(len), () => 0)
}

const generateScoresForUser = (reviews, userId) => {
  const scores = generateZeroArray(5)
  reviews.map((review) => {
    review.scores.map((score, index) => {
      scores[index] += score
    })
  })
  const avgScores = scores.map((score) => {
    return Math.round((score / reviews.length) * 10) / 10
  })
  const scoresObject = {
    userId: userId,
    codeCorrectness: avgScores[0],
    codeDesign: avgScores[1],
    codeStyle: avgScores[2],
    communication: avgScores[3],
    timeManagement: avgScores[4],
  }
  return scoresObject
}

export const getUserScores = async (req, res) => {
  const userId = req.query.userId

  const reviews = await _getUserScores(userId)
  if (!reviews || reviews.length === 0) {
    return res.status(500).json({ message: `${userId} has no reviews` })
  }
  return res.status(200).json(generateScoresForUser(reviews, userId))
}
