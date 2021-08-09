import * as core from '@actions/core'
import * as crypto from 'crypto'

async function run(): Promise<void> {
  try {
    core.info(`[Thundra] Initializer starting...`)

    const random_testrun_id = crypto.randomBytes(12).toString('hex')

    core.setOutput('thundra_agent_testrun_id', random_testrun_id)
    core.info(`[Thundra] Set thundra_agent_testrun_id to ${random_testrun_id}`)

    core.info(`[Thundra] Initializer completed`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
