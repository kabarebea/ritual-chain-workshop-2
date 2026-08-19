const { LevelDetector } = require('./level-detector');

async function main() {
  console.log('🚀 Support/Resistance Level Detector Demo\n');

  const detector = new LevelDetector();

  detector.on('contractCreated', (c) => {
    console.log(`📋 Contract created: ${c.id}\n`);
  });

  detector.on('betPlaced', ({ contractId, side, amount }) => {
    console.log(`💰 ${amount} on ${side} for ${contractId}\n`);
  });

  detector.on('contractSettled', ({ contractId, outcome, price, detectedLevel, levelType, level }) => {
    console.log(`🎯 ${contractId} settled as ${outcome}!`);
    console.log(`   Price: ${price}`);
    console.log(`   Detected Level: ${detectedLevel ? detectedLevel.toFixed(4) : 'N/A'}`);
    console.log(`   Type: ${levelType}, Level: ${level}\n`);
  });

  detector.on('payoutDistributed', ({ contractId, user, amount }) => {
    console.log(`💸 ${amount} to ${user} for ${contractId}`);
  });

  // Contract 1: Resistance ETH
  console.log('=== Contract 1: ETH - Resistance Level > 0.04 ===');
  const c1 = detector.createContract({
    asset: 'ETH',
    levelType: 'RESISTANCE',
    level: 0.04,
    feedUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
    jsonPath: 'ethereum.usd',
    duration: 5,
    maxAttempts: 3
  });

  detector.placeBet(c1.id, 'YES', BigInt(200));
  detector.placeBet(c1.id, 'NO', BigInt(150));

  // Contract 2: Support BTC
  console.log('\n=== Contract 2: BTC - Support Level > 0.03 ===');
  const c2 = detector.createContract({
    asset: 'BTC',
    levelType: 'SUPPORT',
    level: 0.03,
    feedUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    jsonPath: 'bitcoin.usd',
    duration: 3,
    maxAttempts: 2
  });

  detector.placeBet(c2.id, 'YES', BigInt(100));
  detector.placeBet(c2.id, 'NO', BigInt(200));

  // Contract 3: Breakout SOL
  console.log('\n=== Contract 3: SOL - Breakout Level > 0.035 ===');
  const c3 = detector.createContract({
    asset: 'SOL',
    levelType: 'BREAKOUT',
    level: 0.035,
    feedUrl: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
    jsonPath: 'solana.usd',
    duration: 4,
    maxAttempts: 3
  });

  detector.placeBet(c3.id, 'YES', BigInt(80));
  detector.placeBet(c3.id, 'NO', BigInt(40));

  console.log('\n=== Settling contracts ===');
  await detector.advanceTime(6);

  console.log('\n=== All Contracts ===');
  detector.getContracts().forEach(c => {
    console.log(`${c.id}: ${c.status}`);
    console.log(`  YES: ${c.totalYes}, NO: ${c.totalNo}`);
    console.log(`  Outcome: ${c.outcome || 'Pending'}`);
    console.log(`  Detected Level: ${c.detectedLevel ? c.detectedLevel.toFixed(4) : 'N/A'}`);
    console.log('---');
  });

  detector.destroy();
  console.log('\n✅ Level Demo complete!');
}

main().catch(console.error);
