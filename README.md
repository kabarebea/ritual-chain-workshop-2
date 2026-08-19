# Support/Resistance Level Detector

A self-resolving prediction market that identifies **support and resistance levels** in price movements.

## Distinctive Features

- **Level Detection**: Identifies support, resistance, and breakout levels
- **Three Level Types**: Resistance, Support, and Breakout
- **Price Movement Analysis**: Tracks price ranges and deviations
- **Threshold-Based Detection**: Configurable level thresholds

## How Level Detection Works

1. Each contract tracks price movements over time
2. Levels are calculated from price ranges and deviations
3. Resistance: level > threshold, Support: level > threshold, Breakout: |level| > threshold
4. Contracts settle based on the detected levels

## Contracts

- ETH - Resistance Level > 0.04
- BTC - Support Level > 0.03
- SOL - Breakout Level > 0.035

## Installation

npm install
npm start

## License

MIT
