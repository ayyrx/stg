'use strict'

/**
raises any (integer) number to any (positive integer) power
@param {number|BigInt|string} n
@param {number|BigInt|string} expn
@returns {string}
@example
Number.MAX_SAFE_INTEGER // 9007199254740991
Math.pow(16, 13)        // 4503599627370496   (accurate)
Math.pow(16, 14)        // 72057594037927940  (inaccurate - larger than MAX_SAFE_INTEGER)
bigPow(16, 14)          //'72057594037927936' (accurate)
bigPow(16, 65536)       // 78914 character long string (accurate)
*/
function bigPow (n, expn)
{
    return (BigInt(n) ** BigInt(expn)).toString()
}

/**
approximates (rounded up) log2 for any (integer) number
@param {number|BigInt|string} n
@returns {Object}
@example
bigLog2('4294967296') // -> { expn: '32', precise: true }   // 32
bigLog2('4294967297') // -> { expn: '33', precise: false }  // 32.0000000003359
*/
function bigLog2 (n)
{
    n = BigInt(n)

    if (n < 0n) return NaN
    if (n === 0n) return -Infinity
    if (n === 1n) return '0'

    for (let expn = 1n, pow2 = 1n;; expn++)
    {
        if ((pow2 *= 2n) >= n)
        {
            return { expn: expn.toString(), precise: pow2 === n }
        }
    }
}

module.exports = { bigPow, bigLog2 }