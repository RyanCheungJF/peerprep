import {
  writeScoresToCache,
  getScoresFromCache,
  deleteScoresFromCache,
} from '../model/redis-repository.js'

import {
  ormGetAllScoresForUser as _getUserScores,
  ormCreateScores as _createScores,
  ormDeleteAllScoresForUser as _deleteUserScores,
} from '../model/review-orm.js'

// for extensibility, if we want to have more criteria, just add here!
export const FIELDS = [
  'codeCorrectness',
  'codeDesign',
  'codeStyle',
  'communicationStyle',
  'timeManagement',
]

const generateZeroArray = (len) => {
  return Array.from(Array(len), () => 0)
}

const generateAverageScoresForUser = (scores) => {
  const res = {
    userId: scores.userId,
    totalReviews: scores.totalReviews,
  }
  const roundUpToTwoDecimals = (n) => {
    return Math.round((n / scores.totalReviews) * 100) / 100
  }
  FIELDS.forEach((field) => {
    res[field] = roundUpToTwoDecimals(scores[field])
  })
  return res
}

const generateTotalScoresForUser = (reviews, userId) => {
  const scores = generateZeroArray(FIELDS.length)
  reviews.forEach((review) => {
    review.scores.forEach((score, index) => {
      scores[index] += score
    })
  })
  const scoresObject = {
    userId: userId,
    totalReviews: reviews.length,
  }
  FIELDS.forEach((field, index) => {
    scoresObject[field] = scores[index]
  })
  return scoresObject
}

export const getUserScores = async (req, res) => {
  const userId = req.query.userId

  const cacheScores = await getScoresFromCache(userId)
  if (cacheScores) {
    console.log('cache scores', cacheScores)
    return res.status(200).json(generateAverageScoresForUser(cacheScores))
  }

  const reviews = await _getUserScores(userId)
  if (!reviews || reviews.length === 0) {
    return res.status(500).json({ message: `${userId} has no reviews` })
  }

  const totalScores = generateTotalScoresForUser(reviews, userId)
  await writeScoresToCache(totalScores)
  return res.status(200).json(generateAverageScoresForUser(totalScores))
}

export const createScores = async (req, res) => {
  try {
    const { revieweeid, reviewerid, scores } = req.body
    if (!(revieweeid && reviewerid && scores.length === FIELDS.length)) {
      return res
        .status(400)
        .json({ message: 'Bad request, a field is missing!' })
    }
    const scoresObject = {
      userId: revieweeid,
      totalReviews: 1,
    }
    FIELDS.map((field, index) => {
      scoresObject[field] = scores[index]
    })
    await writeScoresToCache(scoresObject)
    if (await _createScores(req.body).err) {
      return res
        .status(500)
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

export const deleteUserScoresFromCache = async (req, res) => {
  const userId = req.query.userId
  if (!userId) {
    return res.status(400).json({ message: 'Username missing!' })
  }

  const successfulDelete = await deleteScoresFromCache(userId)
  return successfulDelete
    ? res.status(200).json({ message: `Deleted scores from cache` })
    : res.status(500).json({ message: 'Could not delete' })
}

export const deleteUserScoresFromDatabase = async (req, res) => {
  const userId = req.query.userId
  if (!userId) {
    return res.status(400).json({ message: 'Username missing!' })
  }

  if (
    (await deleteScoresFromCache(userId)) &&
    (await _deleteUserScores(userId))
  ) {
    return res.status(200).json({
      message: `Deleted all reviews for user ${userId} successfully`,
    })
  }

  return res
    .status(500)
    .json({ message: `Failed to delete reviews for ${userId}` })
}
