<!-- eslint-disable max-len -->
<template>
  <v-row align="center" class="ml-3 mr-3 mt-1">
    <v-item-group
      v-model="window"
      class="shrink mr-6"
      mandatory
      tag="v-flex"
    >
      <v-item
        v-for="n in length"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <div>
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>

    <v-col>
      <v-window
        v-model="window"
        class="elevation-1"
      >
        <v-window-item
          v-for="n in length"
          :key="n"
        >
          <v-card v-if="n===1" flat>
            <v-card-text>
              <v-row
                class="mb-4"
                align="center"
              >
                <v-avatar
                  color="grey"
                  class="mr-4"
                >
                  <v-icon dark>
                    mdi-alarm
                  </v-icon>
                </v-avatar>
                <strong class="text-h6">Show Cpus info</strong>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-cpu-64-bit</v-icon>
                </v-btn>
              </v-row>

              <v-list-item v-for="cpu, i in cpus" :key="i" three-line>
                <v-list-item-content>
                  <v-list-item-title>model - {{ cpu.model }}</v-list-item-title>
                  <v-list-item-subtitle>
                    speed - {{ cpu.speed }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    times - {{ cpu.times }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
          <v-card v-if="n===2" flat>
            <v-card-text>
              <v-row
                class="mb-4"
                align="center"
              >
                <v-avatar
                  color="grey"
                  class="mr-4"
                >
                  <v-icon dark>
                    mdi-alarm
                  </v-icon>
                </v-avatar>
                <strong class="text-h6">Show total memory</strong>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-memory</v-icon>
                </v-btn>
              </v-row>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ memory }} mb</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
          <v-card v-if="n===3" flat>
            <v-card-text>
              <v-row
                class="mb-4"
                align="center"
              >
                <v-avatar
                  color="grey"
                  class="mr-4"
                >
                  <v-icon dark>
                    mdi-alarm
                  </v-icon>
                </v-avatar>
                <strong class="text-h6">OS type and platform</strong>
                <v-spacer />
              </v-row>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ osType }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<script>
import { exec } from 'child_process'

const os = require('os')

export default {
  name: 'ShellExec',
  components: {},
  data () {
    return {
      err: '',
      stdout: '',
      stderr: '',
      length: 3,
      window: 0,
      osType: {},
      platform: {},
      cpus: {},
      memory: {}
    }
  },
  created () {
    const cpu = os.cpus()
    this.cpus = JSON.stringify(cpu)
    this.cpus = JSON.parse(this.cpus)
    this.memory = ((os.totalmem()) / 1048576)
    this.osType = os.type()
    this.platform = os.platform()
    const coffeeProcess = exec('systeminfo')
    coffeeProcess.stdout.on('data', function (data) {
      console.log(data)
      // const lineUp = data
      // lineUp.forEach(element => {
      //   this.value += element
      // })
    })
    // exec('systeminfo', (err, stdout) => {
    //   if (err) {
    //     this.err = err
    //   } else {
    //     for (const line of stdout) {
    //       this.stdout += `${line}`
    //     }
    //   }
    // })
  }
}
</script>
