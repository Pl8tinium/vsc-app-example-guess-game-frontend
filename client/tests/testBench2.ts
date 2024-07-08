import Crypto from 'crypto'
import { Ed25519Provider } from "key-did-provider-ed25519";
import { DID } from "dids";
import KeyResolver from 'key-did-resolver'
import { encodePayload } from 'dag-jose-utils'
import Axios from 'axios'
import {vClient, vTransaction} from '..'


void (async () => {
    const client = new vClient({
        api: 'http://192.168.0.213:1337',
        loginType: 'offchain'
    })
    const secret = Buffer.from('8b9226616064fbcd75711e67ba854e565a0278e94842ebfe52ee615f91a445f9', 'hex')
    const keyPrivate = new Ed25519Provider(secret)
    const did = new DID({ provider: keyPrivate, resolver: KeyResolver.getResolver() })
    await did.authenticate()
    
    await client.login(did)
    const tx = new vTransaction()
    tx.setTx({
        op: 'call_contract',
        action: 'openGame',
        contract_id: "vs41q9c3yg87568jaj4w4aql9xlmmrl7mancnc3pzzjc9672qcqk9vfzug4r9q8phy8t",
        payload: {}
    })
    await tx.broadcast(client);

    
})()