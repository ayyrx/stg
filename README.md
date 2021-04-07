# stg

command line random string/number generator  

## install

`npm i -g r1vn/stg` as root/admin

or [download](https://github.com/r1vn/stg/archive/refs/heads/master.zip) and unpack somewhere, then `ln -s /somewhere/stg/index.js ~/bin/stg; chmod +x ~/bin/stg`

## use

this section is also displayed if you run `stg` without any arguments

```
stg preset [length=16] [count=1] [opts]

preset

    specifies a predefined preset or defines a charset in-place
    built-in presets:
    
    a
        abcdefghijklmnopqrstuvwxyz
    n
        0123456789
    an
        abcdefghijklmnopqrstuvwxyz0123456789
    ascii
        ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_+=[{]}\|:;"',<.>/?
    bin
        01
    oct
        01234567
    hex
        0123456789abcdef
    dw
       original diceware wordlist http://world.std.com/%7Ereinhold/diceware.wordlist.asc
    eff
       EFF diceware wordlist https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt
    lorem
       lorem ipsum dictionary
       
    custom presets can be defined in ~/.config/stg, one character or word per line

length

    the number of words or characters to generate the string from

count

    the number of strings to generate

additional options can be specified in any order:

-c 
    converts the output strings to lower (-c=l), upper (-c=u) or mixed (-c=m) case

-s
    separator inserted into the output strings every -i characters or words
    does not count towards the length of the string
    default: ' '

-i
    separator interval
    default: 0
    
-o
    absolute or relative output file path
    
-t
    toggles console output of trivia about the generated strings
    reported stats do not take into account the changes applied by switching the case or adding a separator

examples:

(preset is defined in-place)
stg abc123

    3b1b13baba2b23b3
    
(using a predefined preset)
stg hex

    2ee553883791194f

stg hex 32

    5f33b61bb98eb2a2c4e829040290ac32

stg hex 32 3

    8ef231b79b8055d9a36994ff773be2e1
    d261ca9203fb609f0f16e44d6519e741
    5ab336c0158e92bdb76a57075cec6049

stg hex 32 3 -c=u

    7EB0F2BA2F517906AEDA35DDA50EE649
    66FBBD64994EE0D6217540DA3FBFC20F
    D7F2EFC812D34954B8882E343458D818

stg hex 32 3 -c=u -i=4

    3B9E 2A11 03BE 128F 3F23 550E A898 6E81
    CCC1 24CD 3563 4C72 5F4A 444F CBE0 00AE
    3E91 F4BE 4BF6 E3CF BC6E 94E7 46F2 FC50

stg hex 32 3 -c=u -i=4 -s=-

    02A9-987E-9F28-CF21-7ADB-0396-1D85-E603
    BD85-6811-166F-D254-7210-CF5B-3A30-6106
    5A54-3798-CCD0-7DFC-85F8-3E49-ECEF-1C1C

stg hex 32 3 -c=u -i=4 -s=- -t

    67C4-ACED-0803-515C-525D-1466-629C-6DBF
    8C49-0068-A0C5-0A7E-2323-2A9D-4377-4A89
    2348-7600-D7F7-E749-8BDE-BA23-6027-1FC5
    ---------------------
    permutations = 16^32 = 340282366920938463463374607431768211456
    entropy bits = log2(16^32) = 128
    
stg hex 32 100000 -c=u -i=4 -s=- -o=hex.txt
    
    (outputs to hex.txt instead of the terminal)
    
(predefined dictionary preset)
stg eff 3

    mayberecreatebreeches

stg eff 3 -i=1

    matrix apostle oboe

stg eff 3 3 -i=1

    veggie pamperer lend
    untagged harmful venomous
    educated affection decoy

stg eff 3 3 -i=1 -c=m

    tHiMBLe cANYon LeGgED
    easINEss oVeRFeEd StriKE
    uNjUStLy traIlIng spONgY

stg eff 3 3 -i=1 -c=u -s=' & '

    UNREVISED & FABULOUS & PROWLER
    RESEND & ALGEBRA & AMONG
    STOIC & REGAIN & ACCURACY

stg eff 20 -i=1 -t

    ride seventy renovator applaud axis irate case mangle degraded tux tyke handwash faster battalion struck freefall criteria senator basically babble
    ---------------------
    permutations = 7776^20 = 653318623500070906096690267158057820537143710472954871543071966369497141477376
    entropy bits = log2(7776^20) ≈ 258.50
```