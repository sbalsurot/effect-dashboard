import Vue from 'vue'

export default (context, inject) => {
  const dao = new Vue({
    data () {
      return {
        proposalConfig: null,
        cycleConfig: null,
        discordMembersOnline: null,
        lastTerms: null
      }
    },

    computed: {
      eos () {
        return context.$eos
      }
    },

    created () {
      this.getDiscordMembersOnline()

      setTimeout(() => {
        this.getProposalConfig()
        this.getLastTerms()
      })
    },

    methods: {
      getDiscordMembersOnline () {
        fetch(`https://discord.com/api/guilds/${process.env.discordGuildId}/widget.json`)
          .then(data => data.json())
          .then((data) => {
            this.discordMembersOnline = data.presence_count
          })
      },
      async getLastTerms () {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.daoContract,
          scope: process.env.daoContract,
          table: 'memberterms',
          reverse: true,
          limit: 1
        })

        this.lastTerms = data.rows[0]
      },
      async getProposalConfig () {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'config'
        })
        if (data.rows.length > 0) {
          console.log(data.rows[0])
          this.proposalConfig = data.rows[0]
          this.getCycleConfig(data.rows[0].currentCycle)
        }
      },
      async getCycleConfig (cycle) {
        const data = await this.eos.rpc.get_table_rows({
          code: process.env.proposalContract,
          scope: process.env.proposalContract,
          table: 'cycle',
          lower_bound: cycle,
          limit: 1
        })
        if (data.rows.length > 0) {
          console.log(data.rows[0])
          this.cycleConfig = data.rows[0]
        }
      },
      async getIpfsProposal (hash) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = await fetch(process.env.ipfsExplorer + '/ipfs/' + hash)
        return data.json()
      }
    }
  })

  inject('dao', dao)
}