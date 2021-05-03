import { Address } from '@graphprotocol/graph-ts';

import { Transfer } from '../../generated/Badger/ERC20';
import { getOrCreateTokenBalance } from '../utils/helpers/token/balance';
export function handlebBadgerTransfer(event: Transfer): void {
  let bbadgerToken = Address.fromString('0x1F7216fdB338247512Ec99715587bb97BBf96eae');
  let fromId = event.params.src
    .toHexString()
    .concat('-')
    .concat(bbadgerToken.toHexString());
  let toId = event.params.dst
    .toHexString()
    .concat('-')
    .concat(bbadgerToken.toHexString());

  let fromAccount = getOrCreateTokenBalance(fromId, bbadgerToken);
  let toAccount = getOrCreateTokenBalance(toId, bbadgerToken);

  fromAccount.balance = fromAccount.balance.minus(event.params.wad);
  toAccount.balance = toAccount.balance.plus(event.params.wad);

  fromAccount.save();
  toAccount.save();
}
