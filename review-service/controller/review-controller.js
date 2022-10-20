import {
  writeScoresToCache,
  getScoresFromCache,
  deleteScoresFromCache,
} from '../model/redis-repository.js'

import {
  ormGetAllScoresForUser as _getUserScores,
  ormCreateScores as _createScores,
} from '../model/review-orm.js'

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
    codeCorrectnessTotal: scores[0],
    codeDesign: avgScores[1],
    codeDesignTotal: scores[1],
    codeStyle: avgScores[2],
    codeStyleTotal: scores[2],
    communication: avgScores[3],
    communicationTotal: scores[3],
    timeManagement: avgScores[4],
    timeManagementTotal: scores[4],
    totalReviews: reviews.length,
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

export const createScores = async (req, res) => {
  try {
    const { revieweeid, reviewerid, scores } = req.body
    if (!(revieweeid && reviewerid && scores.length == 5)) {
      return res
        .status(400)
        .json({ message: 'Bad request, a field is missing!' })
    }
    if (await _createScores(req.body).err) {
      return res
        .status(400)
        .json({ message: 'Could not create a new scores entry!' })
    } else {
      console.log('Created new scores entry successfully!')
      return res
        .status(201)
        .json({ message: `Created new scores entry successfully!` })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Database failure when creating new score!' })
  }
}
