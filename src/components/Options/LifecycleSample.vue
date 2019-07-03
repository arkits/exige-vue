<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="400">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="teal" dark block @click="startLifecycleDemo">Start Lifecycle Demo</v-btn>
        </template>
        <v-card>
            <v-card-title class="teal">
                <h1 class="headline">Lifecycle Demo</h1>
            </v-card-title>

            <v-card-text>
                <h3 class="font-weight-regular">{{lifecyleMessage}}</h3>
                <br />
                <center>
                    <v-btn color="teal" large block @click="dialog = false">Okay</v-btn>
                </center>
            </v-card-text>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "LifecycleSample",
    data() {
        return {
            sampleOperations: [{
                gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                uss_name: "exige.archit.xyz",
                state: "ACTIVE",
                operation_volumes: [{
                        ordinal: 1,
                        min_altitude: {
                            altitude_value: 0,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.43086814880371, 37.80415546165205],
                                    [-122.42812156677245, 37.80415546165205],
                                    [-122.42812156677245, 37.80618990562568],
                                    [-122.43086814880371, 37.80618990562568],
                                    [-122.43086814880371, 37.80415546165205]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 2,
                        min_altitude: {
                            altitude_value: 700,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.4306535720825, 37.80432500079042],
                                    [-122.42494583129883, 37.800883280040885],
                                    [-122.42333650588989, 37.802697408996096],
                                    [-122.42844343185423, 37.8059695102354],
                                    [-122.4306535720825, 37.80432500079042]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 3,
                        min_altitude: {
                            altitude_value: 700,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.42554664611818, 37.80205314400207],
                                    [-122.42056846618652, 37.7743105117552],
                                    [-122.41747856140135, 37.774988939930005],
                                    [-122.423357963562, 37.802324414158214],
                                    [-122.42554664611818, 37.80205314400207]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 4,
                        min_altitude: {
                            altitude_value: 700,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.4187660217285, 37.77695634643178],
                                    [-122.44108200073241, 37.76257271890943],
                                    [-122.43833541870117, 37.75945137373587],
                                    [-122.4161911010742, 37.77471756940714],
                                    [-122.4187660217285, 37.77695634643178]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 5,
                        min_altitude: {
                            altitude_value: 700,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.43919372558592, 37.75917994619179],
                                    [-122.43610382080078, 37.76202988573211],
                                    [-122.45404243469238, 37.76467615984268],
                                    [-122.45498657226561, 37.76107991808569],
                                    [-122.43919372558592, 37.75917994619179]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 6,
                        min_altitude: {
                            altitude_value: 700,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.45387077331543, 37.76155490343394],
                                    [-122.45275497436523, 37.7634548143258],
                                    [-122.4568748474121, 37.765693932366865],
                                    [-122.51206398010254, 37.76304769467159],
                                    [-122.51172065734863, 37.758976374880135],
                                    [-122.45962142944335, 37.76196203130481],
                                    [-122.45387077331543, 37.76155490343394]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 7,
                        min_altitude: {
                            altitude_value: 0,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        max_altitude: {
                            altitude_value: 700,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.51129150390625, 37.759654943740344],
                                    [-122.50665664672852, 37.759654943740344],
                                    [-122.50665664672852, 37.762776280323834],
                                    [-122.51129150390625, 37.762776280323834],
                                    [-122.51129150390625, 37.759654943740344]
                                ]
                            ]
                        }
                    }
                ]
            }],
            samplePositions: [{
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-119.794921875, 45.55252525134013]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-111.57714843749999, 46.830133640447386]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-102.12890625, 45.67548217560647]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-104.80957031249999, 39.53793974517628]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-102.12890625, 33.394759218577995]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-93.8232421875, 34.95799531086792]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-86.3525390625, 33.211116472416855]
                    }
                },
                {
                    gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.56347656249999, 38.13455657705411]
                    }
                },
                {
                    gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-117.2900390625, 32.65787573695528]
                    }
                },
                {
                    gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-114.47753906249999, 28.57487404744697]
                    }
                },
                {
                    gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-109.8193359375, 23.120153621695614]
                    }
                },
                {
                    gufi: "527f31ea-cc79-4082-9551-acfca28f02b6",
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-108.5009765625, 19.269665296502332]
                    }
                }
            ],
            dialog: false,
            lifecycleStarted: false,
            lifecyleMessage: null
        };
    },
    methods: {
        startLifecycleDemo: function () {
            if (!this.$data.lifecycleStarted) {
                this.addOperationToStore();
                
                // this.addPositionToStore();
                this.$data.lifecycleStarted = true;
                this.$data.lifecyleMessage = "Lifecycle demo will start in a sec...";
            } else {
                this.$data.lifecyleMessage =
                    "Lifecycle demo has already been done. Refresh Exige to watch the demo again.";
            }
        },
        addOperationToStore: function () {
            var operations = this.$data.sampleOperations;
            try {
                for (var i in operations) {
                    this.$store.commit("addOperationToSocketOperations", operations[i]);
                    this.$emit('exige-viewOperationOnMap', operations[i]);
                }
            } catch (error) {
                console.log("Error occured when adding Operation to Store!");
                console.error(error);
            }
        },
        addPositionToStore: function () {
            var positions = this.$data.samplePositions;
            try {
                var i = 0;

                var myretardedfunc = function () {
                    if (i < positions.length) {
                        this.$store.commit("addPositionToSocketPositions", positions[i]);
                        i++;
                    } else {
                        window.clearInterval(timer);
                    }
                };

                var timer = window.setInterval(myretardedfunc.bind(this), 1000);
            } catch (error) {
                this.inputError =
                    "Error occured when adding Position to Store... " + error;
                console.log("Error occured when adding Position to Store!");
                console.error(error);
            }
        }
    }
};
</script>
