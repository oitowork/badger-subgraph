import { Address } from '@graphprotocol/graph-ts';

import { Transfer } from '../../generated/Badger/ERC20';
import { getOrCreateTokenBalance } from '../utils/helpers/token/balance';
export function handlebDiggTransfer(event: Transfer): void {
  let bDiggToken = Address.fromString('0x5986D5c77c65e5801a5cAa4fAE80089f870A71dA');
  let fromId = event.params.src
    .toHexString()
    .concat('-')
    .concat(bDiggToken.toHexString());
  let toId = event.params.dst.toHexString().concat('-').concat(bDiggToken.toHexString());

  let fromAccount = getOrCreateTokenBalance(fromId, bDiggToken);
  let toAccount = getOrCreateTokenBalance(toId, bDiggToken);

  fromAccount.balance = fromAccount.balance.minus(event.params.wad);
  toAccount.balance = toAccount.balance.plus(event.params.wad);

  fromAccount.save();
  toAccount.save();
}
