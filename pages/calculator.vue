<template>
  <div>
    <div class="box">
      <h4 class="box-title subtitle">
        Projected Distribution For Cycle {{ curCycleId }}
      </h4>

      <div class="table-container" />
      <table class="table is-fullwidth is-size-6">
        <thead>
          <tr>
            <th>Proposal ID</th>
            <th>Total Vote Weights</th>
            <th>Your Vote Weight</th>
            <th>Projected Result</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="proposal in curCycleProposals" :key="proposal.id">
            <td>{{ proposal.id }}</td>
            <td>{{ (proposal.totalVoteWeight).toLocaleString() }}</td>
            <td>{{ (proposal.yourVoteWeight).toLocaleString() }}</td>
            <td>
              <span v-if="proposal.projectedResult == 0" class="">Abstain (Rejected)</span>
              <span v-if="proposal.projectedResult == 1" class="">Accepted</span>
              <span v-if="proposal.projectedResult == 2" class="">Rejected</span>
            </td>
            <td>{{ (proposal.cost).toLocaleString() }} EFX</td>
          </tr>
        </tbody>
      </table>
      <div class="columns balances">
        <div class="column">
          <div class="box">
            <h5 class="box-title subtitle">
              DAO EFX Budget
            </h5>
            <div class="has-text-centered">
              <div class="mb-3">
                <div class="is-size-6">
                  Total Budget
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ curCycleTotalBudget.toLocaleString() }}<span class="symbol"> EFX</span>
                </div>
              </div>
              <div class="mb-3">
                <div class="is-size-6">
                  Expected Proposals Cost
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ totalPassingProposalCost.toLocaleString() }}<span class="symbol"> EFX</span>
                </div>
              </div>
              <div class="mb-3">
                <div class="is-size-6">
                  Unused Budget
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ budgetRemaining.toLocaleString() }}<span class="symbol"> EFX</span>
                </div>
              </div>
              <div class="mb-3">
                <div class="is-size-6">
                  30% of Unused Budget For Feepool
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ unusedBudgetFeepool.toLocaleString() }}<span class="symbol"> EFX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <h5 class="box-title subtitle">
              DAO Vote Share
            </h5>
            <div class="has-text-centered">
              <div class="mb-3">
                <div class="is-size-6">
                  Total Combined Vote Weights
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ totalProposalVoteWeights.toLocaleString() }}
                </div>
              </div>
              <div class="mb-3">
                <div class="is-size-6">
                  Your Combined Vote Weights
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ yourTotalProposalVoteWeights.toLocaleString() }}
                </div>
              </div>
              <div class="mb-3">
                <div class="is-size-6">
                  Projected Feepool Share
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ (yourProjectedFeepoolShare * 100).toLocaleString() }}<span class="symbol"> %</span>
                </div>
              </div>
              <div class="mb-3">
                <div class="is-size-6">
                  Projected Feepool Rewards
                </div>
                <div class="subtitle is-5 has-text-weight-semibold">
                  {{ (yourProjectedFeepoolRewards).toLocaleString() }}<span class="symbol"> EFX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PieChart from '@/components/PieChart.js'

import { Serialize } from 'eosjs'
import Long from 'long'

export default {
  data () {
    return {
      loading: true,
      curCycleProposals: [],
      curCycleTotalBudget: 0,
      totalPassingProposalCost: 0,
      totalProposalVoteWeights: 0,
      yourTotalProposalVoteWeights: 0,
      budgetRemaining: 0,
      unusedBudgetFeepoolPercent: 0.3,
      unusedBudgetFeepool: 0,
      yourProjectedFeepoolRewards: 0,
      yourProjectedFeepoolShare: 0,
      balances: [],
      claims: {},
      totalFees: null,
      lastCycleTotalFees: null,
      lastCycleTotalWeight: null,
      lastCycleUserWeight: null,
      efxToken: process.env.efxToken,

      // Testing/Dev
      isTestnet: process.env.eosNodeUrl.includes('kylin'),
      cycleOverride: null,
      accountOverride: null,
      claimOverride: null
    }
  },

  computed: {
    accountName () {
      return (this.accountOverride) ? this.accountOverride : (this.$wallet && this.$wallet.wallet) ? this.$wallet.wallet.auth.accountName : null
    },
    distributionBalances () {
      const tbl = this.balances
      return tbl.reverse() // reverse the temp var instead of the original var
    },
    lastCycleId () {
      return (this.cycleOverride) ? this.cycleOverride : (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id - 1 : null
    },
    curCycleId () {
      return (this.cycleOverride) ? this.cycleOverride : (this.$dao.cycleConfig) ? this.$dao.cycleConfig.id : null
    },
    lastCycleUserFees () {
      return (this.lastCycleTotalFees > 0 && this.lastCycleUserWeight > 0) ? Math.trunc((this.lastCycleTotalFees * 10000) / this.lastCycleTotalWeight) / 10000 * this.lastCycleUserWeight : 0
    },
    lastCycleUserShare () {
      return (this.lastCycleUserFees > 0) ? (this.lastCycleUserWeight / this.lastCycleTotalWeight * 100).toFixed(2) : 0
    },
    canClaim () {
      return (this.claimOverride) ? this.claimOverride : !this.claims[this.lastCycleId] && this.lastCycleUserFees > 0 && isFinite(this.lastCycleUserFees)
    },
    genesisAirdrop () {
      return this.$wallet.genesisAirdrop
    }
  },

  watch: {
    accountName () {
      this.resetValues()
      this.init()
    },
    lastCycleId () {
      this.resetValues()
      this.init()
    }
  },

  created () {
    this.init()
  },

  methods: {
    async init () {
      this.loading = true
      if (!this.curCycleId) {
        return
      }
      const cycleData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'cycle',
        lower_bound: this.curCycleId,
        upper_bound: this.curCycleId
      })
      console.log('cycleData', cycleData)

      if (cycleData && cycleData.rows.length > 0) {
        const cycleTotalBudgetStr = cycleData.rows[0].budget[0].quantity
        this.curCycleTotalBudget = parseFloat(cycleTotalBudgetStr.split(' ', 1)[0])
      }

      const curCycleProposalData = await this.$eos.rpc.get_table_rows({
        code: process.env.proposalContract,
        scope: process.env.proposalContract,
        table: 'proposal',
        key_type: 'i64',
        index_position: 3,
        lower_bound: this.curCycleId,
        upper_bound: this.curCycleId
      })
      console.log('curCycleProposalData', curCycleProposalData)

      // If Current Cycle Proposals Exist in Active or Processing State
      if (curCycleProposalData && curCycleProposalData.rows.length > 0) {
        const proposals = []
        for (const proposal of curCycleProposalData.rows) {
          const proposalObj = {}
          // ID
          proposalObj.id = proposal.id
          // Total Vote Weight
          console.log('proposal', proposal.vote_counts)
          const voteCountsObj = {}
          for (const voteCount of proposal.vote_counts) {
            voteCountsObj[voteCount.key] = voteCount.value
          }
          console.log('voteCountsObj', voteCountsObj)
          proposalObj.totalVoteWeight = voteCountsObj[0] + voteCountsObj[1] + voteCountsObj[2]
          proposalObj.yourVoteWeight = await this.getMyVotes(proposal.id)
          proposalObj.projectedResult = voteCountsObj[1] > voteCountsObj[2] ? '1' : '2'

          const proposalCostStr = proposal.pay[0].field_0.quantity
          proposalObj.cost = parseFloat(proposalCostStr.split(' ', 1)[0])
          proposals.push(proposalObj)

          if (proposalObj.projectedResult === '1') {
            this.totalPassingProposalCost += parseFloat(proposalObj.cost)
          }
          this.totalProposalVoteWeights += proposalObj.totalVoteWeight
          this.yourTotalProposalVoteWeights += proposalObj.yourVoteWeight
        }

        this.budgetRemaining = this.curCycleTotalBudget - this.totalPassingProposalCost
        this.unusedBudgetFeepool = this.budgetRemaining * this.unusedBudgetFeepoolPercent
        this.yourProjectedFeepoolShare = this.yourTotalProposalVoteWeights / this.totalProposalVoteWeights
        this.yourProjectedFeepoolRewards = this.yourProjectedFeepoolShare * this.unusedBudgetFeepool
        this.curCycleProposals = proposals
      }
      console.log('this.curCycleProposals', this.curCycleProposals)
      this.loading = false
    },
    resetValues () {
      this.curCycleProposals = []
      this.curCycleTotalBudget = 0
      this.totalPassingProposalCost = 0
      this.totalProposalVoteWeights = 0
      this.yourTotalProposalVoteWeights = 0
      this.budgetRemaining = 0
      this.unusedBudgetFeepoolPercent = 0.3
      this.unusedBudgetFeepool = 0
      this.yourProjectedFeepoolRewards = 0
      this.yourProjectedFeepoolShare = 0
    },
    async getMyVotes (id) {
      // this.loading = true
      let votes = []

      if (this.$dao.proposalConfig) {
        try {
          const config = {
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 4,
            key_type: 'i64',
            limit: 1000,
            lower_bound: id,
            upper_bound: id
          }
          // if (this.nextKey) {
          //   config.lower_bound = this.nextKey
          // }
          const data = await this.$eos.rpc.get_table_rows(config)
          // this.moreVotes = data.more
          // this.nextKey = data.next_key
          votes = data.rows
          // if (!this.votes) {
          //   this.votes = data.rows
          // } else {
          //   this.votes = this.votes.concat(data.rows)
          // }
        } catch (e) {
          console.log(e)
        }

        for (const voter of votes) {
          if (voter.voter === this.accountName) {
            return voter.weight
          }
        }
      }

      return 0
    },
    calculateFees () {
      this.totalFees = Object.values(this.balances).reduce((acc, item) => {
        if (item.balance.length > 0) {
          if (item.cycle_id === this.lastCycleId) {
            this.lastCycleTotalFees = item.balance[0].value / 10000
          }
          return acc + item.balance[0].value / 10000
        }
      }, 0)
    },
    getLastCycleUserWeight (proposalIds) {
      this.lastCycleUserWeight = 0

      if (this.accountName) {
        proposalIds.map(async (proposalId) => {
          const compositeKey = this.getCompositeKey(this.accountName, proposalId)
          const claimData = await this.$eos.rpc.get_table_rows({
            code: process.env.proposalContract,
            scope: process.env.proposalContract,
            table: 'vote',
            index_position: 2,
            key_type: 'i128',
            lower_bound: compositeKey,
            upper_bound: compositeKey
          })

          if (claimData && claimData.rows.length > 0) {
            this.lastCycleUserWeight += claimData.rows[0].weight
          }
        })
      }
    },
    bytesToHex (bytes) {
      let hex = ''
      for (const b of bytes) {
        const n = Number(b).toString(16)
        hex += (n.length === 1 ? '0' : '') + n
      }
      return hex
    },
    getCompositeKey (name, cycle) {
      const buf = new Serialize.SerialBuffer()
      buf.reserve(64)
      buf.pushName(name)
      const nameHex = this.bytesToHex(buf.getUint8Array(8)).match(/../g).reverse().join('')
      const cycleHex = this.bytesToHex(Long.fromNumber(cycle).toBytes())
      return `0x${cycleHex}${nameHex}`
    },
    getUserCycleClaim (cycleId) {
      return (this.claims[cycleId]) ? this.claims[cycleId] : 0
    }
  }
}
</script>

<style lang="scss">
table {
  font-size: 0.7em;

  .tag {
    font-size: 0.9em;
    height: inherit;
  }
}
</style>
