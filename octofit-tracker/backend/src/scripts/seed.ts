import mongoose from 'mongoose'
import { connectDatabase } from '../config/database.js'
import { Activity } from '../models/Activity.js'
import { Leaderboard } from '../models/Leaderboard.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

/** Seed the octofit_db database with test data. */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data')
    await connectDatabase()

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        password: 'octofit-demo-password',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        name: 'Jordan Williams',
        email: 'jordan.williams@example.com',
        password: 'octofit-demo-password',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@example.com',
        password: 'octofit-demo-password',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
    ])

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A supportive team focused on steady running progress.',
        members: [users[0]._id, users[1]._id],
        createdBy: users[0]._id,
      },
      {
        name: 'Core Collective',
        description: 'Strength and mobility sessions for a balanced routine.',
        members: [users[2]._id],
        createdBy: users[2]._id,
      },
    ])

    const activities = await Activity.create([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 42,
        distanceKm: 6.4,
        calories: 470,
        completedAt: new Date('2026-09-15T07:30:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'cycle',
        durationMinutes: 55,
        distanceKm: 18.2,
        calories: 610,
        completedAt: new Date('2026-09-16T18:00:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 35,
        calories: 280,
        completedAt: new Date('2026-09-16T06:45:00Z'),
      },
    ])

    const leaderboard = await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 860, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 720, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 645, rank: 3 },
    ])

    const workouts = await Workout.create([
      {
        title: 'Tempo Run Builder',
        description: 'Build sustainable speed with controlled running intervals.',
        level: 'intermediate',
        category: 'cardio',
        durationMinutes: 35,
        exercises: ['5-minute warm-up', '4 x 5-minute tempo', '2-minute recovery jog', '5-minute cool-down'],
      },
      {
        title: 'Full-Body Foundation',
        description: 'A practical strength session for the major movement patterns.',
        level: 'beginner',
        category: 'strength',
        durationMinutes: 30,
        exercises: ['Bodyweight squat', 'Incline push-up', 'Reverse lunge', 'Dead bug'],
      },
      {
        title: 'Desk Reset Mobility',
        description: 'Release hips, shoulders, and spine after a long day at a desk.',
        level: 'beginner',
        category: 'mobility',
        durationMinutes: 15,
        exercises: ['Cat-cow', 'World’s greatest stretch', 'Thoracic rotation', 'Child’s pose'],
      },
    ])

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts`)
    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase()
