import { Client, PrivateKey } from '@hiveio/dhive'
import { vClient, vTransaction, hexToUint8Array } from '@vsc.eco/client'
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import KeyResolver from 'key-did-resolver'
import { getContractId, VSC_API, useVscTx } from './main'

const HIVE_CLIENT = new Client('https://api.hive.blog')

async function sendHiveTx(hiveAccount, hiveAccountPosting, action, payload) {
    const broadcast = await HIVE_CLIENT.broadcast.json({

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
                contract_id: getContractId(),
                payload: payload
            }
        })
    }, PrivateKey.fromString(hiveAccountPosting))
    return broadcast
}

async function sendVSCTx(didSecret, action, payload) {
    const client = new vClient({
        api: VSC_API,
        loginType: 'offchain'
    })
    const secret = hexToUint8Array(didSecret)
    const keyPrivate = new Ed25519Provider(secret)
    const did = new DID({ provider: keyPrivate, resolver: KeyResolver.getResolver() })
    await did.authenticate()
    
    await client.login(did)
    const tx = new vTransaction()
    tx.setTx({
        op: 'call_contract',
        action: action,
        contract_id: getContractId(),
        payload: payload
    })
    console.log(tx)
    await tx.broadcast(client);
}

async function sendTx(action, payload) {
    if (useVscTx) {
        const vscDid = document.getElementById('vsc-account-did').value;
        await sendVSCTx(vscDid, action, payload)
    } else {
        const hiveAccount = document.getElementById('hive-account').value;
        const hiveAccountPosting = document.getElementById('hive-account-posting').value;
        await sendHiveTx(hiveAccount, hiveAccountPosting, action, payload)
    }
}

async function checkForReply(txId) {
    // visualize current state of tx
}

export async function openGame() {
    const txId = await sendTx('openGame', {})
    await checkForReply(txId)
}

export async function joinGame() {
    const txId = await sendTx('joinGame', {})
    await checkForReply(txId)
}

export async function play(guess) {
    const txId = await sendTx('play', guess)
    await checkForReply(txId)
}

export async function resetGame() {
    const txId = await sendTx('resetGame', {})
    await checkForReply(txId)
}