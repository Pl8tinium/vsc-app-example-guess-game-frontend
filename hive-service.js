import { Client, PrivateKey } from '@hiveio/dhive'

const contractId = 'vs41q9c3yg88fg0ru8muy4r3rjgjgt26ceucmp4sd9nu33v8qdwd8qzm9ezwncqe2j2f'

async function sendHiveTx(hiveAccount, hiveAccountPosting, action, payload) {
    const broadcast = await Client.broadcast.json({

        required_auths: [],
        required_posting_auths: [hiveAccount],
        id: "vsc.tx",
        json: JSON.stringify({
            net_id: "testnet/0bf2e474-6b9e-4165-ad4e-a0d78968d20c",
            __v: '0.1',
            __t: 'native',
            tx: {
                op: 'call_contract',
                action: action,
                contract_id: contractId,
                payload: payload
            }
        })
    }, PrivateKey.fromString(hiveAccountPosting))
    return broadcast
}

async function checkForReply(txId) {

}

export async function openGame() {
    const hiveAccount = document.getElementById('hive-account').value;
    const hiveAccountPosting = document.getElementById('hive-account-posting').value;
    const txId = await sendHiveTx(hiveAccount, hiveAccountPosting, 'openGame', "")
    await checkForReply(txId)
}

export async function joinGame() {
    const hiveAccount = document.getElementById('hive-account').value;
    const hiveAccountPosting = document.getElementById('hive-account-posting').value;
    const txId = await sendHiveTx(hiveAccount, hiveAccountPosting, 'joinGame', "")
    await checkForReply(txId)
}

export async function play(guess) {
    const hiveAccount = document.getElementById('hive-account').value;
    const hiveAccountPosting = document.getElementById('hive-account-posting').value;
    const txId = await sendHiveTx(hiveAccount, hiveAccountPosting, 'play', guess)
    await checkForReply(txId)
}

export async function resetGame() {
    const hiveAccount = document.getElementById('hive-account').value;
    const hiveAccountPosting = document.getElementById('hive-account-posting').value;
    const txId = await sendHiveTx(hiveAccount, hiveAccountPosting, 'resetGame', "")
    await checkForReply(txId)
}