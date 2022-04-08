import React from 'react'
import moment from 'moment'
import getFormattedNumber from '../functions/get-formatted-number'
import Address from './address'

export default function initStaking({token, staking, lp_symbol, reward, lock}) {

    let {reward_token, BigNumber, alertify} = window

    // token, staking
    
    const LP_AMPLIFY_FACTOR = window.config.lp_amplify_factor
    const TOKEN_DECIMALS = window.config.token_decimals
    
    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }
    
    function jsonToCsv(items) {
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(items[0])
        let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')
        return csv
    }
    
    window.handleDownload = ({stakers, stakingTimes, lastClaimedTimes, stakedTokens}) => {
        let list = []
        stakers.forEach((staker, index) => {
            list.push({
                staker_address: staker,
                staking_timestamp_unix: stakingTimes[index],
                lastclaimed_timestamp_unix: lastClaimedTimes[index],
                staking_time: getDate(stakingTimes[index]*1e3),
                lastclaimed_time: getDate(lastClaimedTimes[index]*1e3),
                staked_tokens: stakedTokens[index]
            })
        })
        download('stakers-list.csv', jsonToCsv(list))
    
        function getDate(timestamp) {
            let a = new Date(timestamp)
            return a.toUTCString()
        }
    }
    
    class Staking extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                token_balance: '',
                reward_token_balance: '',
                pendingDivs: '',
                totalEarnedTokens: '',
                cliffTime: '',
                stakingTime: '',
                depositedTokens: '',
                lastClaimedTime: '',
    
                depositAmount: '',
                withdrawAmount: '',
    
                totalEarnedEth: '',
                pendingDivsEth: '',
                wethBalance: '',
    
                tokensToBeSwapped: '',
                tokensToBeDisbursedOrBurnt: '',
    
                coinbase: '',
                tvl: '',
                stakingOwner: null
    
            }
        }
    
        handleListDownload = async (e) => {
            e.preventDefault()
            let m = window.alertify.message(`Processing...`)
            m.ondismiss = () => false
            let step = 100;
            let stakers = []
            let stakingTimes = []
            let lastClaimedTimes = []
            let stakedTokens = []
            let length = await staking.getNumberOfHolders()
            length = Number(length)
            try {
                for (let startIndex = 0; startIndex < length; startIndex += step) {
                    console.log({startIndex, endIndex: startIndex+step})
                    let array = await staking.getDepositorsList(startIndex, Math.min(startIndex+step, length))
                    console.log(array)
                    stakers = stakers.concat(array.stakers)
                    stakingTimes = stakingTimes.concat(array.stakingTimestamps)
                    lastClaimedTimes = lastClaimedTimes.concat(array.lastClaimedTimeStamps)
                    stakedTokens = stakedTokens.concat(array.stakedTokens)
                }
                let result = {stakers, stakingTimes, lastClaimedTimes, stakedTokens}
                window.handleDownload(result)
            } catch (e) {
                console.error(e)
                alertify.error("Something went wrong while processing!")
            }
            finally {
                m.ondismiss = f => true
                m.dismiss()
            }
        }
      
        componentDidMount() {
            this.refreshBalance()
            window._refreshBalInterval = setInterval(this.refreshBalance, 3000)
        }
    
        componentWillUnmount() {
            clearInterval(window._refreshBalInterval)
        }
    
        handleDeposit = (e) => {
            e.preventDefault()
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.depositTOKEN(amount)
        }
    
        handleApprove = (e) => {
            e.preventDefault()
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            token.approve(staking._address, amount)
        }
        handleStake = (e) => {
            let amount = this.state.depositAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.deposit(amount)
        }
    
        handleWithdraw = (e) => {
            e.preventDefault()
            let amount = this.state.withdrawAmount
            amount = new BigNumber(amount).times(1e18).toFixed(0)
            staking.withdraw(amount)
        }
    
        handleClaimDivs = (e) => {
            e.preventDefault()
            staking.claim()
        }
    
        handleSetMaxDeposit = (e) => {
            e.preventDefault()
            this.setState({depositAmount: new BigNumber(this.state.token_balance).div(1e18).toFixed(18)})
        }
        handleSetMaxWithdraw = (e) => {
            e.preventDefault()
            this.setState({withdrawAmount: new BigNumber(this.state.depositedTokens).div(1e18).toFixed(18)})
        }
    
        
        refreshBalance = async () => {
            let coinbase = await window.getCoinbase()
            this.setState({coinbase})
            try {
                let _bal = token.balanceOf(coinbase)
                let _rBal = reward_token.balanceOf(coinbase)
                let _pDivs = staking.getPendingDivs(coinbase)
                let _pDivsEth = staking.getPendingDivsEth(coinbase)
                let _tEarned = staking.totalEarnedTokens(coinbase)
                let _tEarnedEth = staking.totalEarnedEth(coinbase)
                let _stakingTime = staking.depositTime(coinbase)
                let _dTokens = staking.depositedTokens(coinbase)
                let _lClaimTime = staking.lastClaimedTime(coinbase)
                let _tvl = token.balanceOf(staking._address)
                let [token_balance,reward_token_balance, pendingDivs, totalEarnedTokens, stakingTime, 
                depositedTokens, lastClaimedTime, tvl,
                totalEarnedEth, pendingDivsEth
            ] = await Promise.all([_bal, _rBal, _pDivs, _tEarned, _stakingTime, _dTokens, _lClaimTime, _tvl,
                _tEarnedEth, _pDivsEth])
    
                this.setState({
                    token_balance, 
                    reward_token_balance,
                    pendingDivs, 
                    totalEarnedTokens,
                    stakingTime, 
                    depositedTokens,
                    lastClaimedTime,
                    tvl,
                    totalEarnedEth,
                    pendingDivsEth
                })
                let stakingOwner = await staking.owner()
                this.setState({stakingOwner})
            } catch (e) {
                console.error(e)
            }
    
            staking.cliffTime().then((cliffTime) => {
                this.setState({cliffTime: Number(cliffTime)})
            }).catch(console.error)
    
            staking.tokensToBeDisbursedOrBurnt().then(tokensToBeDisbursedOrBurnt => {
                this.setState({tokensToBeDisbursedOrBurnt})
            }).catch(console.error)
    
            staking.tokensToBeSwapped().then(tokensToBeSwapped => {
                this.setState({tokensToBeSwapped})
            })
    
            window.weth.balanceOf(coinbase).then((wethBalance) => {
                this.setState({wethBalance})
            }).catch(console.error)
        }
    
        render() {
    
            let {cliffTime, tokensToBeDisbursedOrBurnt, tokensToBeSwapped, wethBalance, pendingDivsEth, totalEarnedEth, token_balance, reward_token_balance, pendingDivs, totalEarnedTokens, depositedTokens, stakingTime, coinbase, tvl} = this.state
    
            let myShare = ((depositedTokens/ tvl)*100).toFixed(2)
            myShare = getFormattedNumber(myShare, 2)
    
            token_balance = new BigNumber(token_balance*LP_AMPLIFY_FACTOR).div(1e18).toString(10)
            token_balance = getFormattedNumber(token_balance, 6)
    
            wethBalance = new BigNumber(wethBalance).div(1e18).toString(10)
            wethBalance = getFormattedNumber(wethBalance, 6)
    
            tokensToBeSwapped = new BigNumber(tokensToBeSwapped).div(1e18).toString(10)
            tokensToBeSwapped = getFormattedNumber(tokensToBeSwapped, 6)
    
            tokensToBeDisbursedOrBurnt = new BigNumber(tokensToBeDisbursedOrBurnt).div(1e18).toString(10)
            tokensToBeDisbursedOrBurnt = getFormattedNumber(tokensToBeDisbursedOrBurnt, 6)
    
            pendingDivsEth = new BigNumber(pendingDivsEth).div(1e18).toString(10)
            pendingDivsEth = getFormattedNumber(pendingDivsEth, 6)
    
            totalEarnedEth = new BigNumber(totalEarnedEth).div(1e18).toString(10)
            totalEarnedEth = getFormattedNumber(totalEarnedEth, 6)
    
            reward_token_balance = new BigNumber(reward_token_balance).div(10**TOKEN_DECIMALS).toString(10)
            reward_token_balance = getFormattedNumber(reward_token_balance, 6)
    
            pendingDivs = new BigNumber(pendingDivs).div(10**TOKEN_DECIMALS).toString(10)
            pendingDivs = getFormattedNumber(pendingDivs, 6)
    
            totalEarnedTokens = new BigNumber(totalEarnedTokens).div(10**TOKEN_DECIMALS).toString(10)
            totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 6)
    
            depositedTokens = new BigNumber(depositedTokens*LP_AMPLIFY_FACTOR).div(1e18).toString(10)
            depositedTokens = getFormattedNumber(depositedTokens, 6)
    
            tvl = new BigNumber(tvl*LP_AMPLIFY_FACTOR).div(1e18).toString(10)
            tvl = getFormattedNumber(tvl, 6)
    
            stakingTime = stakingTime*1e3
            cliffTime = cliffTime*1e3
            let cliffTimeInWords = 'lockup period'
    
            let canWithdraw = true
            if (!isNaN(cliffTime) && !isNaN(stakingTime)) {
                if (Date.now() - stakingTime <= cliffTime) {
                    canWithdraw = false
                    cliffTimeInWords = moment.duration((cliffTime - (Date.now() - stakingTime))).humanize(true)
                }
            }
    
            let isOwner = String(this.state.coinbase).toLowerCase() === String(window.config.admin_address).toLowerCase()
    
            return (<div>
            <div style={{background: 'white'}}>
                <div className="container mr-0 ml-0" style={{maxWidth: '100%'}}>
                    <div className="row">
                        <div className="col-md-7 mt-3 mb-3 logo-column">
                            <h2  className='container text-left' style={{position: 'relative', maxWidth: '100%'}}>
                                <a href='https://dyp.finance/#/earn'>
                                    <img style={{position: 'relative', maxWidth: '90%', objectFit: 'contain', paddingRight: '10px', height: '100px'}} alt='Staking DAPP' src='/logo192.png'
                                         height='125'/>
                                    {' '}DYP
                                </a> Staking dApp
                            </h2>
                        </div>
                        <div className="col-md-5 mt-3 mb-3 pr-0 pl-0" id="infoPool">
                            <div className="apr-info" style={{maxWidth: '300px', float: 'right', paddingRight: '20px'}}>
                                <div className="mt-3 mb-3 apr-info-child" style={{textAlign: 'justify'}} >
                                    <p className="mb-0"><span
                                        className="text-bold purple-text">{lp_symbol} Pool</span> <span style={{float: 'right'}}><i
                                        className="orange-text"></i></span></p>
                                    <p className="mb-0"><span
                                        className="text-bold purple-text" style={{paddingRight: '4px'}}>Reward Pool: </span> <span style={{float: 'right'}}>{' '} {reward} DYP/month</span></p>
                                    <p className="mb-0"><span
                                        className="text-bold purple-text">Minimum Lock Time: </span><span>{lock}<i
                                        className="orange-text"></i></span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
            <div className='token-staking mt-5'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='row token-staking-form'>
                            <div className='col-12'>
                                <form onSubmit={e => e.preventDefault()}>
                                    <div className='form-group'>
                                        <div class='row'>
                                            <label htmlFor='deposit-amount' className='col-md-8 d-block text-left'>STAKE</label>
                                            <div className='col-4'>
                                                <a target='_blank' rel='noopener noreferrer' href='https://app.uniswap.org/#/add/ETH/0x961C8c0B1aaD0c0b10a51FeF6a867E3091BCef17'>
                                                    <button className='btn btn-sm btn-block btn-primary ' type='button'>
                                                        ADD LIQUIDITY
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                        <div className='input-group input-group-lg'>
                                            <input value={Number(this.state.depositAmount)>0?this.state.depositAmount*LP_AMPLIFY_FACTOR:this.state.depositAmount} onChange={e => this.setState({depositAmount: Number(e.target.value) > 0? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                            <div className='input-group-append'>
                                                <button className='btn btn-lg btn-primary right-radius btn-max' style={{cursor: 'pointer'}} onClick={this.handleSetMaxDeposit}>
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div style={{paddingRight: '0.3rem'}} className='col-6'>
                                            <button onClick={this.handleApprove} className='btn btn-lg btn-block btn-primary ' type='button'>
                                                APPROVE
                                            </button>
                                        </div>
                                        <div style={{paddingLeft: '0.3rem'}} className='col-6'>
                                            <button onClick={this.handleStake} className='btn btn-lg btn-block btn-primary ' type='submit'>
                                                STAKE
                                            </button>
                                        </div>
                                    </div>
                                    <p style={{fontSize: '.8rem'}} className='mt-1 text-center mb-0'>
                                        {/* Some info text here.<br /> */}
                                        Please approve before staking.
                                    </p>

                                </form>
                            </div>
                            <div className='col-12'>
                                <form onSubmit={this.handleWithdraw}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='d-block text-left'>UNSTAKE</label>
                                        <div className='input-group input-group-lg'>
                                            <input value={Number(this.state.withdrawAmount) > 0 ? this.state.withdrawAmount*LP_AMPLIFY_FACTOR:this.state.withdrawAmount} onChange={e => this.setState({withdrawAmount: Number(e.target.value) > 0 ? e.target.value/LP_AMPLIFY_FACTOR : e.target.value})} className='form-control left-radius' placeholder='0' type='text' />
                                            <div className='input-group-append'>
                                                <button className='btn btn-lg btn-primary right-radius btn-max' style={{cursor: 'pointer'}} onClick={this.handleSetMaxWithdraw}>
                                                    MAX
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button title={canWithdraw?'':`You recently staked, you can unstake ${cliffTimeInWords}`} disabled={!canWithdraw} className='btn btn-lg btn-primary btn-block ' type='submit'>
                                        UNSTAKE
                                    </button>
                                    {/* <p style={{fontSize: '.8rem'}} className='mt-1 text-center'>Some info text here.</p> */}
                                </form>
                            </div>
                            <div className='col-12'>
                                <form onSubmit={this.handleClaimDivs}>
                                    <div className='form-group'>
                                        <label htmlFor='deposit-amount' className='text-left d-block'>REWARDS</label>
                                        <div className='form-row'>
                                            <div className='col-md-6'>
                                                <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: '#222'}}><span style={{fontSize: '1.2rem', color: 'rgb(255, 0, 122)'}}>{pendingDivsEth}</span> <small className='text-bold'>WETH</small></p>
                                            </div>
                                            <div className='col-md-6'>
                                                <p className='form-control  text-right' style={{border: 'none', marginBottom: 0, paddingLeft: 0,  background: 'transparent', color: '#222'}}><span style={{fontSize: '1.2rem', color: 'rgb(255, 0, 122)'}}>{pendingDivs}</span> <small className='text-bold'>DYP</small></p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-lg btn-primary btn-block ' type='submit'>
                                        CLAIM
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='table-responsive-'>
                            <h3 style={{fontSize: '1.3rem', fontWeight: 'bold', padding: '.3rem'}}>STATS</h3>
                            <table className='table-stats table table-sm table-borderless'>
                                <tbody>
                                    <tr>
                                        <th>My Address</th>
                                        <td className='text-right'>
                                            <Address style={{fontFamily: 'monospace'}} a={coinbase} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Contract Address</th>
                                        <td className='text-right'>
                                            <Address style={{fontFamily: 'monospace'}} a={staking._address} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>My LP Balance</th>
                                        <td className="text-right"><strong>{token_balance}</strong> <small>{lp_symbol}</small></td>
                                    </tr>
                                    <tr>
                                        <th>My DYP Balance</th>
                                        <td className="text-right"><strong>{reward_token_balance}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>My WETH Balance</th>
                                        <td className="text-right"><strong>{wethBalance}</strong> <small>WETH</small></td>
                                    </tr>
                                    <tr>
                                        <th>MY LP Staked</th>
                                        <td className="text-right"><strong>{depositedTokens}</strong> <small>{lp_symbol}</small></td>
                                    </tr>
                                    <tr>
                                        <th>Total LP Staked</th>
                                        <td className="text-right"><strong>{tvl}</strong> <small>{lp_symbol}</small></td>
                                    </tr>
                                    <tr>
                                        <th>My Share</th>
                                        <td className="text-right"><strong>{myShare}</strong> <small>%</small></td>
                                    </tr>
                                    <tr>
                                        <th>Total Earned DYP</th>
                                        <td className="text-right"><strong>{totalEarnedTokens}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>Total Earned WETH</th>
                                        <td className="text-right"><strong>{totalEarnedEth}</strong> <small>WETH</small></td>
                                    </tr>
                                    <tr>
                                        <th>To be Swapped</th>
                                        <td className="text-right"><strong>{tokensToBeSwapped}</strong> <small>DYP</small></td>
                                    </tr>
                                    <tr>
                                        <th>To be burnt / disbursed</th>
                                        <td className="text-right"><strong>{tokensToBeDisbursedOrBurnt}</strong> <small>DYP</small></td>
                                    </tr>
                                    {/* <tr>
                                        <th>Pending</th>
                                        <td className="text-right"><strong>{pendingDivs}</strong> <small>DYP</small></td>
                                    </tr> */}

                                    <tr>
                                        <td style={{fontSize: '1rem', paddingTop: '2rem'}} colSpan='2' className='text-center'>
                                            <a target='_blank' rel='noopener noreferrer' href={`${window.config.etherscan_baseURL}/token/${token._address}?a=${coinbase}`}>View Transaction History on Etherscan</a> &nbsp; <i style={{fontSize: '.8rem'}} className='fas fa-external-link-alt'></i>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td style={{fontSize: '1rem'}} colSpan='2' className='text-center'>
                                            <span className='lp-link'>
                                                <a target='_blank' rel='noopener noreferrer' href='#'>Some External Link Here</a> &nbsp; <i style={{fontSize: '1rem'}} className='fas fa-external-link-alt'></i>
                                            </span>
                                        </td>
                                    </tr> */}
                                    {isOwner && <tr>
                                        <td style={{fontSize: '1rem'}} colSpan='2' className='text-center'>
                                            <a onClick={this.handleListDownload} target='_blank' rel='noopener noreferrer' href='#'><i style={{fontSize: '.8rem'}} className='fas fa-download'></i> Download Stakers List </a>
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>


                {/* <div className='mt-3 text-center'>
                    <p><small>Some info text here</small></p>
                </div> */}
                </div>
             </div>
            </div>
            )
        }
    }


    return Staking
}
