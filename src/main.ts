import * as core from '@actions/core'
import { Client } from 'ssh2'

// /**
//  * The main function for the action.
//  * @returns {Promise<void>} Resolves when the action is complete.
//  */
// export async function run(): Promise<void> {
//   try {
//     const ms: string = core.getInput('milliseconds')

//     // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
//     core.debug(`Waiting ${ms} milliseconds ...`)

//     // Log the current timestamp, wait, then log the new timestamp
//     core.debug(new Date().toTimeString())
//     await wait(parseInt(ms, 10))
//     core.debug(new Date().toTimeString())

//     // Set outputs for other workflow steps to use
//     core.setOutput('time', new Date().toTimeString())
//   } catch (error) {
//     // Fail the workflow run if an error occurs
//     if (error instanceof Error) core.setFailed(error.message)
//   }
// }
function arrayBufferToString(buffer: Buffer, encoding = 'utf-8'): string {
  const decoder = new TextDecoder(encoding)
  return decoder.decode(buffer)
}
export async function proc(): Promise<void> {
  try {
    const host: string = core.getInput('host')

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true

    const port: string = core.getInput('port') || '22'
    const privateKey: string = core.getInput('privateKey')
    const username: string = core.getInput('username')
    const command: string = core.getInput('command')
    core.debug(`Waiting host:${host} ${privateKey}`)
    const conn = new Client()
    conn
      .on('ready', () => {
        core.debug('Client :: ready')
        conn.exec(command, (err, stream) => {
          if (err) throw err
          stream
            .on('close', (code: string, signal: number) => {
              core.debug(`Stream :: close :: code: ${code}, signal: ${signal}`)
              conn.end()
            })
            .on('data', (data: Buffer) => {
              core.debug(`STDOUT: ${data}`)
              core.setOutput('result', arrayBufferToString(data))
              console.log(data.toString('utf-8'));
            })
            .stderr.on('data', data => {
              core.debug(`STDERR: ${data}`)
              core.setOutput('error', arrayBufferToString(data))
              console.log(data.toString('utf-8'));
            })
        })
      })
      .connect({
        host,
        port: parseInt(port, 10),
        username,
        privateKey
      })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
