#!/usr/bin/env node

'use strict' // 2021-04-01 13.57

const fs = require('fs')
const os = require('os')
const crypto = require('crypto')
const { xdArgvParse } = require('./util/xdArgvParse')

void function main ()
{
    process.addListener('uncaughtException', err =>
    {
        console.error(err.message || err)
        process.exit(1)
    })

    const { args, opts } = xdArgvParse(process.argv.slice(2))

    if (!args.length)
    {
        const readme = fs.readFileSync(__dirname + '/README.md', 'utf8')
        console.log(readme.match(/```([\s\S]*?)```/)[1].trim())
        return
    }

    if (args.length > 3)
    {
        throw `expected 1-3 arguments, got ${ args.length }`
    }

    for (const key in opts)
    {
        if (!['t', 's', 'c', 'i', 'o'].includes(key))
        {
            throw `unknown option: ${ key }`
        }
    }

    // config

    const config =
    {
        preset: [],
        length: 16,
        count: 1,
        case: '',
        interval: 0,
        separator: ' ',
        outfile: ''
    }

    if (fs.existsSync(`${ os.homedir() }/.config/stg/${ args[0] }`))
    {
        config.preset = fs.readFileSync(`${ os.homedir() }/.config/stg/${ args[0] }`, 'utf8').split('\n').filter(str => str !== '')
    }
    else if (fs.existsSync(`${ __dirname }/presets/${ args[0] }`))
    {
        config.preset = fs.readFileSync(`${ __dirname }/presets/${ args[0] }`, 'utf8').split('\n').filter(str => str !== '')
    }
    else
    {
        config.preset = args[0].split('')
    }

    if (args.length > 1)
    {
        config.length = Number(args[1])

        if (!Number.isInteger(config.length) || config.length < 1)
        {
            throw `length must be an integer > 0`
        }
    }

    if (args.length > 2)
    {
        config.count = Number(args[2])

        if (!Number.isInteger(config.count) || config.count < 1)
        {
            throw `count must be an integer > 0`
        }
    }

    if (opts.c !== undefined)
    {
        config.case = opts.c

        if (!['l', 'u', 'm'].includes(config.case))
        {
            throw `if specified, case (-c) must be 'l', 'u', or 'm' (lower/upper/mixed)`
        }
    }

    if (opts.i !== undefined)
    {
        config.interval = Number(opts.i)

        if (!Number.isInteger(config.interval) || config.interval < 0)
        {
            throw `interval must be an integer >= 0`
        }
    }

    if (opts.s !== undefined)
    {
        config.separator = opts.s
    }

    if (opts.o !== undefined)
    {
        const { xdFileWrite } = require('./util/xdFileWrite')
        const path = require('path')
        config.outfile = path.resolve(opts.o)

        try
        {
            xdFileWrite(config.outfile, '')
        }
        catch (err)
        {
            throw `failed to create the output file ${ config.outfile }: ${ err.message }`
        }
    }

    //

    const outstream = config.outfile ? fs.createWriteStream(config.outfile) : process.stdout

    for (let i = 0; i < config.count; i++)
    {
        let str = ''

        for (let i = 0; i < config.length; i++)
        {
            if (config.interval && i > 0 && i % config.interval === 0)
            {
                str += config.separator
            }

            str += config.preset[crypto.randomInt(config.preset.length)]
        }

        if (config.case)
        {
            if (config.case === 'l')
            {
                str = str.toLowerCase()
            }
            else if (config.case === 'u')
            {
                str = str.toUpperCase()
            }
            else
            {
                let mstr = ''

                for (const char of str)
                {
                    mstr += crypto.randomInt(2) ? char.toLowerCase() : char.toUpperCase()
                }

                str = mstr
            }
        }

        outstream.write(str + '\n')
    }

    //

    if (opts.t)
    {
        const { bigPow, bigLog2 } = require('./util/etc')

        const p = bigPow(config.preset.length, config.length)
        const { expn, precise } = bigLog2(p)
        const pn = `${ config.preset.length }^${ config.length }`

        if (!opts.o) console.log('---------------------')
        console.log(`permutations = ${ pn } = ${ p }`)
        console.log(`entropy bits = log2(${ pn }) ${ precise ? '=' : '≈' } ${ expn }`)
    }
}()