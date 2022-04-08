window.IS_CONNECTED = false
window.the_graph_result = {}
// MAKE SURE THIS ADDRESS IS LOWERCASE
const TOKEN_ADDRESS = "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"

// MAKE SURE ALL THESE ADDRESSES ARE LOWERCASE
const TOKENS_DISBURSED_PER_YEAR = [
	180_000,
	270_000,
	450_000,
	600_000,

	180_000,
	270_000,
	450_000,
	600_000,

	180_000,
	270_000,
	450_000,
	600_000,
]

window.rebase_factors = [
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
	1e0,
]

const LP_IDs =
	{
		"eth": [
			"0x87c546525cf48f28d73ea218c625d6f748721717-0xb4338fc62b1de93f63bfedb9fd9bac455d50a424",
			"0x87c546525cf48f28d73ea218c625d6f748721717-0x2c1411d4f1647b88a7b46c838a3760f925bac83b",
			"0x87c546525cf48f28d73ea218c625d6f748721717-0x2c51df297a2aa972a45ed52110afd24591c6f302",
			"0x87c546525cf48f28d73ea218c625d6f748721717-0xd7180d6fea393158d42d0d0cd66ab93048f581e3",
		],
		"wbtc": [
			"0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68-0x8a607e099e835bdbc4a606acb600ef475414f450",
			"0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68-0x34dd0d25fa2e3b220d1eb67460c45e586c61c2bb",
			"0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68-0xb07c67b65e6916ba87b6e3fa245aa18f77b4413e",
			"0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68-0x52adfbb5bc9f9fee825bd56feb11f1fc90e0b47e",
		],
		"usdc": [
			"0xc7a4d04699a9539d33e86ce746e88553149c8528-0x111ae4ca424036d09b4e0fc9f1de5e6dc90d586b",
			"0xc7a4d04699a9539d33e86ce746e88553149c8528-0x7637fa253180556ba486d2fa5d2bb328eb0aa7ca",
			"0xc7a4d04699a9539d33e86ce746e88553149c8528-0x2f3c4a08dad0f8a56ede3961ab654020534b8a8c",
			"0xc7a4d04699a9539d33e86ce746e88553149c8528-0x417538f319afddd351f33222592b60f985475a21",
		]
	}

window.LP_IDs = LP_IDs

const LP_ID_LIST = Object.keys(LP_IDs).map(key => LP_IDs[key]).flat()
const TOKENS_DISBURSED_PER_YEAR_BY_LP_ID = {}
LP_ID_LIST.forEach((lp_id, i) => TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] = TOKENS_DISBURSED_PER_YEAR[i])
const VAULT_ADDRESSES_LIST = LP_ID_LIST.map(id => id.split('-')[1])

window.LP_ID_LIST = LP_ID_LIST

window.config = {
	max_referral_addresses_per_call: 4,
	ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
	admin_address: '0x910090ea889b64b4e722ea4b8ff6d5e734dfb38f',
	// governance_address: '0x0b49488729bb20423c1eb6559bb0c4d7608152b4',
	governance_address: '0x2cf8b55a6a492c2f8e750ad1fa4e4a858044deea',
	vote_duration_in_seconds: 259200, // 5 minutes for test
	execution_allowance_in_seconds: 259200, // 5 minutes for test

	MIN_BALANCE_TO_INIT_PROPOSAL: 5000e18,
	QUORUM: 25000e18,


	//dyp-eth 3 days
	token_address: '0x87c546525cf48f28d73ea218c625d6f748721717',
	staking_address: '0xb4338fc62b1de93f63bfedb9fd9bac455d50a424',

	//dyp-eth 30 days
	token_dyp30_address: '0x87c546525cf48f28d73ea218c625d6f748721717',
	staking_dyp30_address: '0x2c1411d4f1647b88a7b46c838a3760f925bac83b',

	//dyp-eth 60 days
	token_dyp60_address: '0x87c546525cf48f28d73ea218c625d6f748721717',
	staking_dyp60_address: '0x2c51df297a2aa972a45ed52110afd24591c6f302',

	//dyp-eth 60 days
	token_dyp90_address: '0x87c546525cf48f28d73ea218c625d6f748721717',
	staking_dyp90_address: '0xd7180d6fea393158d42d0d0cd66ab93048f581e3',

	//dyp-wbtc 3 days
	token_wbtc3_address: '0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68',
	staking_wbtc3_address: '0x8a607e099e835bdbc4a606acb600ef475414f450',

	//dyp-wbtc 30 days
	token_wbtc30_address: '0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68',
	staking_wbtc30_address: '0x34dd0d25fa2e3b220d1eb67460c45e586c61c2bb',

	//dyp-wbtc 60 days
	token_wbtc60_address: '0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68',
	staking_wbtc60_address: '0xb07c67b65e6916ba87b6e3fa245aa18f77b4413e',

	//dyp-wbtc 90 days
	token_wbtc90_address: '0x2fcf1b0d83f83135b6e5e2e231e07ae89c235f68',
	staking_wbtc90_address: '0x52adfbb5bc9f9fee825bd56feb11f1fc90e0b47e',

	//dyp-usdc 3 days
	token_usdc3_address: '0xc7a4d04699a9539d33e86ce746e88553149c8528',
	staking_usdc3_address: '0x111ae4ca424036d09b4e0fc9f1de5e6dc90d586b',

	//dyp-usdc 30 days
	token_usdc30_address: '0xc7a4d04699a9539d33e86ce746e88553149c8528',
	staking_usdc30_address: '0x7637fa253180556ba486d2fa5d2bb328eb0aa7ca',

	//dyp-usdc 60 days
	token_usdc60_address: '0xc7a4d04699a9539d33e86ce746e88553149c8528',
	staking_usdc60_address: '0x2f3c4a08dad0f8a56ede3961ab654020534b8a8c',

	//dyp-usdc 90 days
	token_usdc90_address: '0xc7a4d04699a9539d33e86ce746e88553149c8528',
	staking_usdc90_address: '0x417538f319afddd351f33222592b60f985475a21',

	//DYP-USDT 3 days
	token_usdt3_address: '0x76911E11FddB742D75b83C9e1F611F48f19234E4',
	staking_usdt3_address: '0x4a76Fc15D3fbf3855127eC5DA8AAf02DE7ca06b3',

	//DYP-USDT 30 days
	token_usdt30_address: '0x76911E11FddB742D75b83C9e1F611F48f19234E4',
	staking_usdt30_address: '0xF4abc60a08B546fA879508F4261eb4400B55099D',

	//DYP-USDT 60 days
	token_usdt60_address: '0x76911E11FddB742D75b83C9e1F611F48f19234E4',
	staking_usdt60_address: '0x13F421Aa823f7D90730812a33F8Cac8656E47dfa',

	//DYP-USDT 90 days
	token_usdt90_address: '0x76911E11FddB742D75b83C9e1F611F48f19234E4',
	staking_usdt90_address: '0x86690BbE7a9683A8bAd4812C2e816fd17bC9715C',

	token_dai_address: '0xa964d4ff6C14822Fc64CE4eC5Dc707D869DaC0bA',
	staking_dai_address: '0x850942B57DD500b73bBdB9F713789Ca72D10D235',

	reward_token_address: '0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17',
	weth_address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
	etherscan_baseURL: 'https://bscscan.com',
	max_proposals_per_call: 4,
	// default_gasprice_gwei: 60,
	default_gas_amount: 600000,
	token_decimals: 18,
	lp_amplify_factor: 1e0,

	// new_governance_address: '0x0b49488729bb20423c1eb6559bb0c4d7608152b4',
	new_governance_address: '0x2cf8b55a6a492c2f8e750ad1fa4e4a858044deea'
}

window.vaults = [
	{
		hidden: true,
		contract_address: '0x10f612d6D8521f9d4c888c007Ed72Bf5E8DB2105',
		short_name: 'DYP/DAI Pool',
		logo: '/images/uni-v2.webp',
		name: 'DYP/DAI LP Vault\n72 Hours Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '3000 DYP / month',
		link: '/staking-dai'
	},
	{
		hidden: true,
		contract_address: '0x23f2552f9D0dd03EAa026b18b1d854546a03a05f',
		short_name: 'DYP/ETH Pool',
		logo: '/images/uni-v2.webp',
		name: 'DYP/ETH LP Vault\n72 Hours Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '3000 DYP / month',
		link: '/staking-eth'
	},
	{
		hidden: false,
		contract_address: window.config.staking_address,
		short_name: 'DYP/ETH Pool',
		logo: '/images/ETH.png',
		name: 'DYP/ETH LP Pool\n72 Hours Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '250,000 DYP / month',
		link: '/staking-eth'
	}, {
		hidden: false,
		contract_address: window.config.staking_dai_address,
		short_name: 'DYP/WBTC Pool',
		logo: '/images/WBTC.png',
		name: 'DYP/WBTC LP Pool\n72 Hours Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '250,000 DYP / month',
		link: '/staking-wbtc'
	}, {
		hidden: false,
		contract_address: window.config.staking_dai_address,
		short_name: 'DYP/USDC Pool',
		logo: '/images/USDC.png',
		name: 'DYP/USDC LP Pool\n72 Hours Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '250,000 DYP / month',
		link: '/staking-usdc'
	}, {
		hidden: false,
		contract_address: window.config.staking_dai_address,
		short_name: 'DYP/USDT Pool',
		logo: '/images/USDT.png',
		name: 'DYP/USDT LP Pool\n72 Hours Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '250,000 DYP / month',
		link: '/staking-usdt'
	}
]

window.vaultsFarming = [
	{
		hidden: false,
		contract_address: window.config.staking_address,
		short_name: 'DYP Farming Pool',
		logo: '/logo192.png',
		name: 'DYP Farming Pool\n30 Days Locking',
		description: 'Deposit DYP and earn DYP',
		return_heading: 'APR',
		return_description: '20%-35%',
		link: '/constant-staking'
	}
]

window.vaultsEth = [
	{
		hidden: false,
		contract_address: window.config.staking_address,
		short_name: 'DYP/ETH Pool',
		logo: '/images/ETH.png',
		name: 'DYP/ETH LP Pool\n3 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '30,000 DYP / month',
		link: '/staking-eth-3'
	},
	{
		hidden: false,
		contract_address: window.config.staking_dyp30_address,
		short_name: 'DYP/ETH Pool',
		logo: '/images/ETH.png',
		name: 'DYP/ETH LP Pool\n30 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '45,000 DYP / month',
		link: '/staking-eth-30'
	},
	{
		hidden: false,
		contract_address: window.config.staking_dyp60_address,
		short_name: 'DYP/ETH Pool',
		logo: '/images/ETH.png',
		name: 'DYP/ETH LP Pool\n60 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '75,000 DYP / month',
		link: '/staking-eth-60'
	},
	{
		hidden: false,
		contract_address: window.config.staking_dyp90_address,
		short_name: 'DYP/ETH Pool',
		logo: '/images/ETH.png',
		name: 'DYP/ETH LP Pool\n90 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '100,000 DYP / month',
		link: '/staking-eth-90'
	}
]

window.vaultsWbtc = [
	{
		hidden: false,
		contract_address: window.config.staking_wbtc3_address,
		short_name: 'DYP/WBTC Pool',
		logo: '/images/WBTC.png',
		name: 'DYP/WBTC LP Pool\n3 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '30,000 DYP / month',
		link: '/staking-wbtc-3'
	},
	{
		hidden: false,
		contract_address: window.config.staking_wbtc30_address,
		short_name: 'DYP/WBTC Pool',
		logo: '/images/WBTC.png',
		name: 'DYP/WBTC LP Pool\n30 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '45,000 DYP / month',
		link: '/staking-wbtc-30'
	},
	{
		hidden: false,
		contract_address: window.config.staking_wbtc60_address,
		short_name: 'DYP/WBTC Pool',
		logo: '/images/WBTC.png',
		name: 'DYP/WBTC LP Pool\n60 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '75,000 DYP / month',
		link: '/staking-wbtc-60'
	},
	{
		hidden: false,
		contract_address: window.config.staking_wbtc90_address,
		short_name: 'DYP/WBTC Pool',
		logo: '/images/WBTC.png',
		name: 'DYP/WBTC LP Pool\n90 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '100,000 DYP / month',
		link: '/staking-wbtc-90'
	}
]

window.vaultsUsdc = [
	{
		hidden: false,
		contract_address: window.config.staking_usdc3_address,
		short_name: 'DYP/USDC Pool',
		logo: '/images/USDC.png',
		name: 'DYP/USDC LP Pool\n3 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '30,000 DYP / month',
		link: '/staking-usdc-3'
	},
	{
		hidden: false,
		contract_address: window.config.staking_usdc30_address,
		short_name: 'DYP/USDC Pool',
		logo: '/images/USDC.png',
		name: 'DYP/USDC LP Pool\n30 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '45,000 DYP / month',
		link: '/staking-usdc-30'
	},
	{
		hidden: false,
		contract_address: window.config.staking_usdc60_address,
		short_name: 'DYP/USDC Pool',
		logo: '/images/USDC.png',
		name: 'DYP/USDC LP Pool\n60 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '75,000 DYP / month',
		link: '/staking-usdc-60'
	},
	{
		hidden: false,
		contract_address: window.config.staking_usdc90_address,
		short_name: 'DYP/USDC Pool',
		logo: '/images/USDC.png',
		name: 'DYP/USDC LP Pool\n90 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '100,000 DYP / month',
		link: '/staking-usdc-90'
	}
]

window.vaultsUsdt = [
	{
		hidden: false,
		contract_address: window.config.staking_usdt3_address,
		short_name: 'DYP/USDT Pool',
		logo: '/images/USDT.png',
		name: 'DYP/USDT LP Pool\n3 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '30,000 DYP / month',
		link: '/staking-usdt-3'
	},
	{
		hidden: false,
		contract_address: window.config.staking_usdt30_address,
		short_name: 'DYP/USDT Pool',
		logo: '/images/USDT.png',
		name: 'DYP/USDT LP Pool\n30 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '45,000 DYP / month',
		link: '/staking-usdt-30'
	},
	{
		hidden: false,
		contract_address: window.config.staking_usdt60_address,
		short_name: 'DYP/USDT Pool',
		logo: '/images/USDT.png',
		name: 'DYP/USDT LP Pool\n60 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '75,000 DYP / month',
		link: '/staking-usdt-60'
	},
	{
		hidden: false,
		contract_address: window.config.staking_usdt90_address,
		short_name: 'DYP/USDT Pool',
		logo: '/images/USDT.png',
		name: 'DYP/USDT LP Pool\n90 Days Locking',
		description: 'Deposit LP and earn WETH',
		return_heading: 'Pool Rewards',
		return_description: '100,000 DYP / month',
		link: '/staking-usdt-90'
	}
]

window.constantStakingList = [
	{
		hidden: false,
		contract_address: window.config.constant_staking_30_address,
		short_name: 'DYP Farming',
		logo: '/logo192.png',
		name: 'DYP Farming\n30 Days Locking',
		description: 'Farm DYP to earn more DYP',
		return_heading: 'APR',
		return_description: '20%',
		link: '/constant-staking-30'
	},
	{
		hidden: false,
		contract_address: window.config.constant_staking_60_address,
		short_name: 'DYP Farming',
		logo: '/logo192.png',
		name: 'DYP Farming\n60 Days Locking',
		description: 'Farm DYP to earn more DYP',
		return_heading: 'APR',
		return_description: '25%',
		link: '/constant-staking-60'
	},
	{
		hidden: false,
		contract_address: window.config.constant_staking_60_address,
		short_name: 'DYP Farming',
		logo: '/logo192.png',
		name: 'DYP Farming\n90 Days Locking',
		description: 'Farm DYP to earn more DYP',
		return_heading: 'APR',
		return_description: '30%',
		link: '/constant-staking-90'
	},
	{
		hidden: false,
		contract_address: window.config.constant_staking_60_address,
		short_name: 'DYP Farming',
		logo: '/logo192.png',
		name: 'DYP Farming\n120 Days Locking',
		description: 'Farm DYP to earn more DYP',
		return_heading: 'APR',
		return_description: '35%',
		link: '/constant-staking-120'
	}
]

window.GOVERNANCE_ABI = [
	{
		"inputs": [],
		"name": "MIN_BALANCE_TO_INIT_PROPOSAL",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "QUORUM",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RESULT_EXECUTION_ALLOWANCE_PERIOD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TRUSTED_TOKEN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "VOTE_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "actions",
		"outputs": [
			{
				"internalType": "enum Governance.Action",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"internalType": "enum Governance.Option",
				"name": "option",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "executeProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "enum Governance.Action",
				"name": "_proposalAction",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_optionOneVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_optionTwoVotes",
				"type": "uint256"
			},
			{
				"internalType": "contract StakingPool",
				"name": "_stakingPool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_newGovernance",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_proposalStartTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isProposalExecuted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isProposalExecuted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "isProposalExecutible",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "isProposalOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastVotedProposalStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "newGovernances",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "optionOneVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "optionTwoVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract StakingPool",
				"name": "pool",
				"type": "address"
			}
		],
		"name": "proposeDisburseOrBurn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract StakingPool",
				"name": "pool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "newGovernance",
				"type": "address"
			}
		],
		"name": "proposeUpgradeGovernance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "removeVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakingPools",
		"outputs": [
			{
				"internalType": "contract StakingPool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalDepositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "votedForOption",
		"outputs": [
			{
				"internalType": "enum Governance.Option",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "votesForProposalByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawAllTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.NEW_GOVERNANCE_ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"internalType": "enum Governance.Option",
				"name": "option",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newMinBalanceToInitProposal",
				"type": "uint256"
			}
		],
		"name": "changeMinBalanceToInitProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newQuorum",
				"type": "uint256"
			}
		],
		"name": "changeQuorum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "executeProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "contract StakingPool",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "PoolCallReverted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "contract StakingPool",
				"name": "",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "PoolCallReverted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "contract StakingPool",
				"name": "",
				"type": "address"
			}
		],
		"name": "PoolCallSucceeded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "enum Governance.PoolGroupName",
				"name": "poolGroupName",
				"type": "uint8"
			}
		],
		"name": "proposeDisburseOrBurn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newMinBalance",
				"type": "uint256"
			}
		],
		"name": "proposeNewMinBalanceToInitProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newQuorum",
				"type": "uint256"
			}
		],
		"name": "proposeNewQuorum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "proposeText",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Governance.PoolGroupName",
				"name": "poolGroupName",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "newGovernance",
				"type": "address"
			}
		],
		"name": "proposeUpgradeGovernance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "removeVotes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20TokenFromPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyLegacyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyLegacyERC20TokenFromPool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawAllTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "actions",
		"outputs": [
			{
				"internalType": "enum Governance.Action",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ADMIN_CAN_CLAIM_AFTER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ADMIN_FEATURES_EXPIRE_AFTER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_proposalId",
				"type": "uint256"
			},
			{
				"internalType": "enum Governance.Action",
				"name": "_proposalAction",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "_optionOneVotes",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_optionTwoVotes",
				"type": "uint256"
			},
			{
				"internalType": "contract StakingPool[]",
				"name": "_stakingPool",
				"type": "address[]"
			},
			{
				"internalType": "address",
				"name": "_newGovernance",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_proposalStartTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isProposalExecuted",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_newQuorum",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_proposalText",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_newMinBalance",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum Governance.PoolGroupName",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hardcodedStakingPools",
		"outputs": [
			{
				"internalType": "contract StakingPool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isProposalExecuted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "isProposalExecutible",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposalId",
				"type": "uint256"
			}
		],
		"name": "isProposalOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastVotedProposalStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MIN_BALANCE_TO_INIT_PROPOSAL",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "newGovernances",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "newMinBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "newQuorums",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "optionOneVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "optionTwoVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pendingOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposalTexts",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "QUORUM",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RESULT_EXECUTION_ALLOWANCE_PERIOD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakingPools",
		"outputs": [
			{
				"internalType": "contract StakingPool",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalDepositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TRUSTED_TOKEN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "VOTE_DURATION",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "votedForOption",
		"outputs": [
			{
				"internalType": "enum Governance.Option",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "votesForProposalByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

window.STAKING_ABI = [
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "swapPath",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EthRewardsDisbursed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "EthRewardsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardsDisbursed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardsTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "BURN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAGIC_NUMBER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "SLIPPAGE_TOLERANCE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "SWAP_PATH",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addContractBalance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminCanClaimAfter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminClaimableTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnOrDisburseTokensPeriod",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "burnRewardTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cliffTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractDeployTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToDeposit",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disburseAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disburseDuration",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disbursePercentX100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "disburseRewardTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "emergencyWithdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}
		],
		"name": "getDepositorsList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stakers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakingTimestamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "lastClaimedTimeStamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakedTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMaxSwappableAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfHolders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPendingDisbursement",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getPendingDivsEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastBurnOrTokenDistributeTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastClaimedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastDisburseTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastEthDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastSwapExecutionTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapAttemptPeriod",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensToBeDisbursedOrBurnt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokensToBeSwapped",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewardsEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnedEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalEthDivPoints",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyOldERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trustedDepositTokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "trustedRewardTokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapRouterV2",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Pair",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Pair",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.CONSTANT_STAKING_ABI = [
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "emergencyUnstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ReferralFeeTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "reInvest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Reinvest",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "holder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "RewardsTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToStake",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "stake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyLegacyERC20Token",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToWithdraw",
				"type": "uint256"
			}
		],
		"name": "unstake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ADMIN_CAN_CLAIM_AFTER",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractStartTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "depositedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getActiveReferredStaker",
		"outputs": [
			{
				"internalType": "address",
				"name": "_staker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_totalEarned",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfHolders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referrer",
				"type": "address"
			}
		],
		"name": "getNumberOfReferredStakers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_activeStakers",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalStakers",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getReferredStaker",
		"outputs": [
			{
				"internalType": "address",
				"name": "_staker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_totalEarned",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "startIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endIndex",
				"type": "uint256"
			}
		],
		"name": "getStakersList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stakers",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakingTimestamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "lastClaimedTimeStamps",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "stakedTokens",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_holder",
				"type": "address"
			}
		],
		"name": "getTotalPendingDivs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastClaimedTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LOCKUP_TIME",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REFERRAL_FEE_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "referrals",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_INTERVAL",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "REWARD_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "rewardsPendingClaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "STAKING_FEE_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakingTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedReferralFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalClaimedRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalEarnedTokens",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalReferralFeeEarned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TRUSTED_TOKEN_ADDRESS",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UNSTAKING_FEE_RATE_X_100",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

window.TOKEN_ABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_extraData",
				"type": "bytes"
			}
		],
		"name": "approveAndCall",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "initialSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferAnyERC20Token",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
window.WETH_ABI = window.TOKEN_ABI
window.REWARD_TOKEN_ABI = window.TOKEN_ABI
window.cached_contracts = {}

Object.keys(window.config).filter(k => (k.startsWith('token_') || k.startsWith('staking_') || k.startsWith('constant_staking_')) && k.endsWith('_address'))
	.forEach(k => {
		window[k.replace('_address', '_ABI').toUpperCase()] = (k.startsWith('token_')) ? window.TOKEN_ABI : (k.startsWith('constant_staking_')) ? window.CONSTANT_STAKING_ABI : window.STAKING_ABI
	})

// function to connect metamask
async function connectWallet() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum)
		try {
			await window.ethereum.enable()
			console.log("Connected!")
			window.IS_CONNECTED = true
			return true;
		} catch (e) {
			console.error(e)
			throw new Error("User denied wallet connection!")
		}
	} else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider)
		console.log("connected to old web3")
		window.IS_CONNECTED = true
		return true
	} else {
		throw new Error("No web3 detected!")
	}
}

function param(name) {
	var f = new RegExp("\\b" + name + "=([^&]+)").exec(document.location.search);
	if (f) return decodeURIComponent(f[1].replace(/\+/g, " "));
}
window.param = param

/**
 *
 * @param {"TOKEN" | "STAKING"} key
 */
async function getContract(key) {
	let ABI = window[key+'_ABI']
	let address = window.config[key.toLowerCase()+'_address']
	if (!window.cached_contracts[key]) {
		window.cached_contracts[key] = new window.web3.eth.Contract(ABI, address, {from: await window.web3.eth.getCoinbase()})
	}

	return window.cached_contracts[key]
}

function getCoinbase() {
	return window.web3.eth.getCoinbase()
}


class TOKEN {

	constructor(key="TOKEN") {
		this.key = key
		let address = window.config[key.toLowerCase()+'_address']
		this._address = address
	}

	async transfer(to, amount) {
		let contract = await getContract(this.key)

		let gas = window.config.default_gas_amount
		try {
			let estimatedGas = await contract.methods['transfer'](to, amount).estimateGas({ gas })
			if (estimatedGas) {
				gas = Math.min(estimatedGas, gas)
				//console.log('TRANSFER '+gas)
			}
		} catch (e) {
			console.warn(e)
		}
		return (await contract.methods.transfer(to, amount).send({gas, from: await window.web3.eth.getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
	}
	async totalSupply() {
		let contract = await getContract(this.key)
		return (await contract.methods.totalSupply().call())
	}
	async approve(spender, amount) {
		let contract = await getContract(this.key)
		let gas = window.config.default_gas_amount
		try {
			let estimatedGas = await contract.methods['approve'](spender
				, amount).estimateGas({ gas })
			if (estimatedGas) {
				gas = Math.min(estimatedGas, gas)
				//console.log('estimatedgas'+gas)
			}
		} catch (e) {
			console.warn(e)
		}
		return (await contract.methods.approve(spender, amount).send({gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
	}
	async balanceOf(address) {
		let contract = await getContract(this.key)
		return (await contract.methods.balanceOf(address).call())
	}
}

class STAKING {
	constructor(ticker='STAKING', token='TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase()+'_address']
		this._address = address;
		[
			"owner",
			"depositedTokens",
			"depositTime",
			"cliffTime",
			"lastClaimedTime",
			"totalEarnedTokens",
			"totalEarnedEth",
			"getPendingDivs",
			"getPendingDivsEth",
			"tokensToBeDisbursedOrBurnt",
			"tokensToBeSwapped",
			"getNumberOfHolders",
			"getDepositorsList",
			"swapAttemptPeriod",
			"lastSwapExecutionTime"
		].forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"deposit",
			"withdraw",
			"claim"
		].forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				console.log(value)
				let gas = window.config.default_gas_amount
				try {
					let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
					if (estimatedGas) {
						gas = Math.min(estimatedGas, gas)
						//console.log('estimatedgas'+gas)
					}
				} catch (e) {
					console.warn(e)
				}
				return (await contract.methods[fn_name](...args).send({value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
			}
		})
	}

	async depositTOKEN(amount) {
		let token_contract = await getContract(this.token)
		let staking_contract = await getContract(this.ticker)
		let batch = new window.web3.eth.BatchRequest()
		batch.add(token_contract.methods.approve(staking_contract._address, amount).send.request({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
		batch.add(staking_contract.methods.deposit(amount).send.request({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
		return batch.execute()
	}

}

class CONSTANT_STAKING {
	constructor(ticker = 'CONSTANT_STAKING_30', token = 'REWARD_TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase() + '_address']
		this._address = address;
		[
			"owner",
			"depositedTokens",
			"stakingTime",
			"LOCKUP_TIME",
			"lastClaimedTime",
			"totalEarnedTokens",
			"getPendingDivs",
			"totalReferralFeeEarned",
			"getNumberOfHolders",
			"getStakersList",
			"getTotalPendingDivs",
			"getNumberOfReferredStakers",
			"getReferredStaker",
			"getActiveReferredStaker",
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"stake",
			"unstake",
			"claim",
			"reInvest"
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				console.log(value)
				let gas = window.config.default_gas_amount
				try {
					let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
					if (estimatedGas) {
						gas = Math.min(estimatedGas, gas)
						console.log('estimatedgas'+gas)
					}
				} catch (e) {
					console.warn(e)
				}
				return (await contract.methods[fn_name](...args).send({ value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
			}
		})
	}

	async depositTOKEN(amount, referrer) {
		let token_contract = await getContract(this.token)
		let staking_contract = await getContract(this.ticker)
		let batch = new window.web3.eth.BatchRequest()
		batch.add(token_contract.methods.approve(staking_contract._address, amount).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		batch.add(staking_contract.methods.deposit(amount, referrer).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		return batch.execute()
	}
}

class GOVERNANCE {
	constructor(ticker='GOVERNANCE', token='REWARD_TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase()+'_address']
		this._address = address;
		[
			"QUORUM",
			"MIN_BALANCE_TO_INIT_PROPOSAL",
			"VOTE_DURATION",
			"RESULT_EXECUTION_ALLOWANCE_PERIOD",
			"actions",
			"optionOneVotes",
			"optionTwoVotes",
			"stakingPools",
			"newGovernances",
			"proposalStartTime",
			"isProposalExecuted",
			"totalDepositedTokens",
			"votesForProposalByAddress",
			"votedForOption",
			"lastVotedProposalStartTime",
			"lastIndex",
			"getProposal",
			"isProposalOpen",
			"isProposalExecutible"
		].forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"proposeDisburseOrBurn",
			"proposeUpgradeGovernance",
			"addVotes",
			"removeVotes",
			"withdrawAllTokens",
			"executeProposal",
		].forEach(fn_name => {
			this[fn_name] = async function(...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				console.log(value)
				let gas = window.config.default_gas_amount
				try {
					let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
					if (estimatedGas) {
						gas = Math.min(estimatedGas, gas)
						//console.log('estimatedgas'+gas)
					}
				} catch (e) {
					console.warn(e)
				}
				return (await contract.methods[fn_name](...args).send({value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
			}
		})
	}

	async addVotesOneClick(proposalId, option, amount) {
		let token_contract = await getContract(this.token)
		let governance_contract = await getContract(this.ticker)
		let batch = new window.web3.eth.BatchRequest()
		batch.add(token_contract.methods.approve(governance_contract._address, amount).send.request({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
		batch.add(governance_contract.methods.addVotes(proposalId, option, amount).send.request({gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei*1e9}))
		return batch.execute()
	}
}

class NEW_GOVERNANCE {
	constructor(ticker = 'NEW_GOVERNANCE', token = 'REWARD_TOKEN') {
		this.ticker = ticker;
		this.token = token
		let address = window.config[ticker.toLowerCase() + '_address']
		this._address = address;
		[
			"QUORUM",
			"MIN_BALANCE_TO_INIT_PROPOSAL",
			"VOTE_DURATION",
			"RESULT_EXECUTION_ALLOWANCE_PERIOD",
			"actions",
			"optionOneVotes",
			"optionTwoVotes",
			"stakingPools",
			"newGovernances",
			"proposalStartTime",
			"isProposalExecuted",
			"totalDepositedTokens",
			"votesForProposalByAddress",
			"votedForOption",
			"lastVotedProposalStartTime",
			"lastIndex",
			"getProposal",
			"isProposalOpen",
			"isProposalExecutible"
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				return (await contract.methods[fn_name](...args).call())
			}
		});


		[
			"proposeDisburseOrBurn",
			"proposeNewQuorum",
			"proposeNewMinBalanceToInitProposal",
			"proposeText",
			"proposeUpgradeGovernance",
			"addVotes",
			"removeVotes",
			"withdrawAllTokens",
			"executeProposal",
		].forEach(fn_name => {
			this[fn_name] = async function (...args) {
				let contract = await getContract(this.ticker)
				let value = 0;
				console.log(value)
				let gas = window.config.default_gas_amount
				try {
					let estimatedGas = await contract.methods[fn_name](...args).estimateGas({ gas })
					if (estimatedGas) {
						gas = Math.min(estimatedGas, gas)
						//console.log('estimatedgas'+gas)
					}
				} catch (e) {
					console.warn(e)
				}
				if (fn_name == 'proposeText') {
					gas = undefined
				}
				return (await contract.methods[fn_name](...args).send({ value, gas, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
			}
		})
	}

	async addVotesOneClick(proposalId, option, amount) {
		let token_contract = await getContract(this.token)
		let governance_contract = await getContract(this.ticker)
		let batch = new window.web3.eth.BatchRequest()
		batch.add(token_contract.methods.approve(governance_contract._address, amount).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		batch.add(governance_contract.methods.addVotes(proposalId, option, amount).send.request({ gas: window.config.default_gas_amount, from: await getCoinbase(), gasPrice: window.config.default_gasprice_gwei * 1e9 }))
		return batch.execute()
	}
}

window.governance = new GOVERNANCE
window.new_governance = new NEW_GOVERNANCE

//DYP-ETH
window.token = new TOKEN
window.staking = new STAKING
window.reward_token = new TOKEN("REWARD_TOKEN")
window.weth = new TOKEN("WETH")

window.token_dyp_30 = new TOKEN("TOKEN_DYP30")
window.staking_dyp_30 = new STAKING("STAKING_DYP30", "TOKEN_DYP30")

window.token_dyp_60 = new TOKEN("TOKEN_DYP30")
window.staking_dyp_60 = new STAKING("STAKING_DYP60", "TOKEN_DYP60")

window.token_dyp_90 = new TOKEN("TOKEN_DYP90")
window.staking_dyp_90 = new STAKING("STAKING_DYP90", "TOKEN_DYP90")


//DYP-WBTC
window.token_wbtc_3 = new TOKEN("TOKEN_WBTC3")
window.staking_wbtc_3 = new STAKING("STAKING_WBTC3", "TOKEN_WBTC3")

window.token_wbtc_30 = new TOKEN("TOKEN_WBTC30")
window.staking_wbtc_30 = new STAKING("STAKING_WBTC30", "TOKEN_WBTC30")

window.token_wbtc_60 = new TOKEN("TOKEN_WBTC60")
window.staking_wbtc_60 = new STAKING("STAKING_WBTC60", "TOKEN_WBTC60")

window.token_wbtc_90 = new TOKEN("TOKEN_WBTC90")
window.staking_wbtc_90 = new STAKING("STAKING_WBTC90", "TOKEN_WBTC90")

//DYP-USDC
window.token_usdc_3 = new TOKEN("TOKEN_USDC3")
window.staking_usdc_3 = new STAKING("STAKING_USDC3", "TOKEN_USDC3")

window.token_usdc_30 = new TOKEN("TOKEN_USDC30")
window.staking_usdc_30 = new STAKING("STAKING_USDC30", "TOKEN_USDC30")

window.token_usdc_60 = new TOKEN("TOKEN_USDC60")
window.staking_usdc_60 = new STAKING("STAKING_USDC60", "TOKEN_USDC60")

window.token_usdc_90 = new TOKEN("TOKEN_USDC90")
window.staking_usdc_90 = new STAKING("STAKING_USDC90", "TOKEN_USDC90")


//DYP-USDT
window.token_usdt_3 = new TOKEN("TOKEN_USDT3")
window.staking_usdt_3 = new STAKING("STAKING_USDT3", "TOKEN_USDT3")

window.token_usdt_30 = new TOKEN("TOKEN_USDT30")
window.staking_usdt_30 = new STAKING("STAKING_USDT30", "TOKEN_USDT30")

window.token_usdt_60 = new TOKEN("TOKEN_USDT60")
window.staking_usdt_60 = new STAKING("STAKING_USDT60", "TOKEN_USDT60")

window.token_usdt_90 = new TOKEN("TOKEN_USDT90")
window.staking_usdt_90 = new STAKING("STAKING_USDT90", "TOKEN_USDT90")


window.token_dai = new TOKEN("TOKEN_DAI")
window.staking_dai = new STAKING("STAKING_DAI", "TOKEN_DAI")

// constant staking
window.constant_staking_30 = new CONSTANT_STAKING("CONSTANT_STAKING_30")
window.constant_staking_60 = new CONSTANT_STAKING("CONSTANT_STAKING_60")
window.constant_staking_90 = new CONSTANT_STAKING("CONSTANT_STAKING_90")
window.constant_staking_120 = new CONSTANT_STAKING("CONSTANT_STAKING_120")


/**
 * Returns the ETH USD Price, Token USD Prices, LP USD Prices, and amount of LP Staked, usd value of LP staked
 *
 * lp_id example: `"pair_address-pool_contract_address"`
 *
 * @param {{token_contract_addresses: object[], lp_ids: object[], tokens_disbursed_per_year: object}} props - MAKE SURE ALL ADDRESSES ARE LOWERCASE!
 */
function get_usd_values({
							token_contract_addresses,
							lp_ids,
						}) {
	return new Promise((resolve, reject) => {
		fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({query:`{
  
	tokens(where:{
  id_in: ${JSON.stringify(token_contract_addresses.map(a => a.toLowerCase()))}}) {
	  id
	  symbol
	  name
	  decimals
	  untrackedVolumeUSD
		derivedETH
	}
	
	bundle(id: 1) {
	  id
	  ethPrice
	}
	
	liquidityPositions(where: 
	  {id_in: 
		  ${JSON.stringify(lp_ids.map(id => id.toLowerCase()))},
	  }) {
	  id
	  pair {
		reserveUSD
		totalSupply
	  }
	  liquidityTokenBalance
	}
  }
  `, variables: null}),
		})
			.then(res => res.json())
			.then(res => handleTheGraphData(res))
			.catch(reject)


		function handleTheGraphData(response) {
			try {
				let data = response.data
				if (!data) return reject(response);

				console.log(data)

				let usd_per_eth = new BigNumber(data.bundle.ethPrice).toFixed(2)*1

				let token_data = {}, lp_data = {}

				data.tokens.forEach(t => {
					token_data[t.id] = {
						token_volume_usd_all_time: new BigNumber(t.untrackedVolumeUSD).toFixed(2)*1,
						token_price_usd: new BigNumber(t.derivedETH).times(usd_per_eth).toFixed(2)*1
					}
				})

				data.liquidityPositions.forEach(lp => {
					let usd_per_lp = new BigNumber(lp.pair.reserveUSD).div(lp.pair.totalSupply).toFixed(2)*1
					let lp_staked = lp.liquidityTokenBalance
					let usd_value_of_lp_staked = new BigNumber(lp_staked).times(usd_per_lp).toFixed(2)*1
					lp_data[lp.id] = {
						lp_staked,
						usd_per_lp,
						usd_value_of_lp_staked,
					}
				})
				resolve({token_data, lp_data, usd_per_eth})
			} catch (e) {
				console.error(e)
				reject(e)
			}
		}
	})
}

/**
 *
 * @param {string[]} staking_pools_list - List of Contract Addresses for Staking Pools
 * @returns {number[]} List of number of stakers for each pool
 */
async function get_number_of_stakers(staking_pools_list) {
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	} finally {
		if (!coinbase) {
			return (await Promise.all(staking_pools_list.map(() => Promise.resolve(0))))
		}
	}

	return (await Promise.all(staking_pools_list.map(contract_address => {
		let contract = new window.web3.eth.Contract(window.STAKING_ABI, contract_address, {from: coinbase})
		return contract.methods.getNumberOfHolders().call()
	}))).map(h => Number(h))
}

async function get_token_balances({
									  TOKEN_ADDRESS,
									  HOLDERS_LIST
								  }) {
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	} finally {
		if (!coinbase) {
			return (await Promise.all(HOLDERS_LIST.map(() => Promise.resolve(0))))
		}
	}

	let token_contract = new window.web3.eth.Contract(window.TOKEN_ABI, TOKEN_ADDRESS, {from: coinbase})

	return (await Promise.all(HOLDERS_LIST.map(h => {
		return token_contract.methods.balanceOf(h).call()
	})))
}

function wait(ms) {
	console.log("Waiting " + ms + 'ms')
	return new Promise(r => setTimeout(() => {
		r(true)
		console.log("Wait over!")
	}, ms))
}

/**
 *
 * @param {{token_data, lp_data}} usd_values - assuming only one token is there in token_list
 */
async function get_apy_and_tvl(usd_values) {
	let {token_data, lp_data, usd_per_eth} = usd_values

	let token_price_usd = token_data[TOKEN_ADDRESS].token_price_usd*1
	let balances_by_address = {}, number_of_holders_by_address = {}
	let lp_ids = Object.keys(lp_data)
	let addrs = lp_ids.map(a => a.split('-')[1])
	let token_balances = await get_token_balances({TOKEN_ADDRESS, HOLDERS_LIST: addrs})
	addrs.forEach((addr, i) => balances_by_address[addr] = token_balances[i])

	await wait(2000)

	let number_of_holders = await get_number_of_stakers(addrs)
	addrs.forEach((addr, i) => number_of_holders_by_address[addr] = number_of_holders[i])

	lp_ids.forEach(lp_id => {
		let apy = 0, tvl_usd = 0

		let pool_address = lp_id.split('-')[1]
		let token_balance = new BigNumber(balances_by_address[pool_address] || 0)
		let token_balance_value_usd = token_balance.div(1e18).times(token_price_usd).toFixed(2)*1

		tvl_usd = token_balance_value_usd + lp_data[lp_id].usd_value_of_lp_staked*1

		apy = (TOKENS_DISBURSED_PER_YEAR_BY_LP_ID[lp_id] * token_price_usd * 100 / (lp_data[lp_id].usd_value_of_lp_staked || 1)).toFixed(2)*1

		lp_data[lp_id].apy = apy
		lp_data[lp_id].tvl_usd = tvl_usd
		lp_data[lp_id].stakers_num = number_of_holders_by_address[pool_address]
	})

	return {token_data, lp_data, usd_per_eth, token_price_usd}
}

async function refreshBalance() {

	//await wait(10000)
	let coinbase;
	try {
		if (!window.IS_CONNECTED) throw new Error("Wallet Not Connected!")
		coinbase = await getCoinbase()
	} catch (e) {
		console.warn(e)
	}

	let reward_token = window.reward_token
	//console.log('coinbase' + coinbase)

	let _tvl30 = await reward_token.balanceOf('0x7fc2174670d672ad7f666af0704c2d961ef32c73')
	_tvl30 = _tvl30 / 1e18

	let _tvl60 = await reward_token.balanceOf('0x036e336ea3ac2e255124cf775c4fdab94b2c42e4')
	_tvl60 = _tvl60 / 1e18

	let _tvl90 = await reward_token.balanceOf('0x0a32749d95217b7ee50127e24711c97849b70c6a')
	_tvl90 = _tvl90 / 1e18

	let _tvl120 = await reward_token.balanceOf('0x82df1450efd6b504ee069f5e4548f2d5cb229880')
	_tvl120 = _tvl120 / 1e18 + 0.1

	//console.log('tvlll+ ' + _tvl)

	let [usdPerToken] = await Promise.all([window.getPrice('defi-yield-protocol')])
	let valueee = (_tvl30 + _tvl60 + _tvl90 + _tvl120) * usdPerToken
	//console.log('usdper '+valueee)
	return valueee

}

async function get_usd_values_with_apy_and_tvl(...arguments) {
	return (await get_apy_and_tvl(await get_usd_values(...arguments)))
}


async function refresh_the_graph_result() {
	let result = await get_usd_values_with_apy_and_tvl({token_contract_addresses: [TOKEN_ADDRESS], lp_ids: LP_ID_LIST})
	window.the_graph_result = result
	window.TVL_FARMING_POOLS = await refreshBalance()
	return result
}

window.get_usd_values = get_usd_values
window.get_token_balances = get_token_balances
window.get_apy_and_tvl = get_apy_and_tvl
window.get_number_of_stakers = get_number_of_stakers
window.refresh_the_graph_result = refresh_the_graph_result

function getPrice(coingecko_id = 'ethereum', vs_currency = 'usd') {
	return new Promise((resolve, reject) => {
		window.$.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coingecko_id}&vs_currencies=${vs_currency}`)
			.then((result) => {
				resolve(result[coingecko_id][vs_currency])
			})
			.catch((error) => {
				reject(error)
			})
	})
}

window.getPrice = getPrice

