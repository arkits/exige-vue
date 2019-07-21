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
                                    [-122.41104125976564, 37.76637243960179],
                                    [-122.4031448364258, 37.76637243960179],
                                    [-122.4031448364258, 37.77261441408201],
                                    [-122.41104125976564, 37.77261441408201],
                                    [-122.41104125976564, 37.76637243960179]
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
                                    [-122.40966796874999, 37.7280949075216],
                                    [-122.40486145019531, 37.7280949075216],
                                    [-122.40486145019531, 37.77464972662077],
                                    [-122.40966796874999, 37.77464972662077],
                                    [-122.40966796874999, 37.7280949075216]
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
                                    [-122.41069793701172, 37.729248952286184],
                                    [-122.3964500427246, 37.70046034927789],
                                    [-122.38992691040038, 37.70229391925025],
                                    [-122.4037456512451, 37.73169275242101],
                                    [-122.41069793701172, 37.729248952286184]
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
                                    [-122.39936828613281, 37.703380457832374],
                                    [-122.39215850830078, 37.67553288205085],
                                    [-122.38254547119139, 37.67689154297775],
                                    [-122.38992691040038, 37.70609673460725],
                                    [-122.39936828613281, 37.703380457832374]
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
                                    [-122.38546371459961, 37.681239090750346],
                                    [-122.4151611328125, 37.66058596987982],
                                    [-122.41138458251953, 37.65365501656227],
                                    [-122.38134384155272, 37.67200024720591],
                                    [-122.38546371459961, 37.681239090750346]
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
                                    [-122.41825103759764, 37.65813982494158],
                                    [-122.39679336547852, 37.60552821745789],
                                    [-122.38855361938475, 37.60797609482423],
                                    [-122.40983963012695, 37.661809012124635],
                                    [-122.41825103759764, 37.65813982494158]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 7,
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
                                    [-122.4031448364258, 37.61640705577992],
                                    [-122.40177154541014, 37.60729613696987],
                                    [-122.3818588256836, 37.611239805997606],
                                    [-122.38460540771483, 37.621302013833],
                                    [-122.4031448364258, 37.61640705577992]
                                ]
                            ]
                        }
                    },
                    {
                        ordinal: 8,
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
                                    [-122.39095687866211, 37.612599643383284],
                                    [-122.38374710083008, 37.612599643383284],
                                    [-122.38374710083008, 37.61831068887273],
                                    [-122.39095687866211, 37.61831068887273],
                                    [-122.39095687866211, 37.612599643383284]
                                ]
                            ]
                        }
                    }
                ]
            }],
            samplePositions: [{
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.40726470947266, 37.769900576875834]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.40743637084961, 37.75307256315459]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.40743637084961, 37.73909154437981]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.40365982055663, 37.72089869333035]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.39215850830078, 37.693465202875686]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.39009857177734, 37.671728499097895]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.41155624389647, 37.65718852458835]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.40760803222655, 37.64305348359734]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.40185737609865, 37.62660452137556]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.39619255065918, 37.61266763459988]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 600,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.39516258239745, 37.61375548561097]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 100,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.38700866699219, 37.61470734219136]
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
                this.addPositionToStore();
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
                    this.$emit("exige-viewOperationOnMap", operations[i]);
                }
            } catch (error) {
                console.log("Error occured when adding Operation to Store!");
                console.error(error);
            }
        },
        addPositionToStore: function () {
            var positions = this.$data.samplePositions;

            try {
                for (var i in positions) {
                    this.$store.commit("addPositionToSocketPositions", positions[i]);
                }
            } catch (error) {
                console.log("Error occured when adding Position to Store!");
                console.error(error);
            }

            /*
                                                try {
                                                    var i = 0;

                                                    var delayedPositionAdder = function () {
                                                        if (i < positions.length) {
                                                            this.$store.commit("addPositionToSocketPositions", positions[i]);
                                                            i++;
                                                        } else {
                                                            window.clearInterval(timer);
                                                        }
                                                    };

                                                    var timer = window.setInterval(delayedPositionAdder.bind(this), 1000);

                                                } catch (error) {
                                                    this.inputError =
                                                        "Error occured when adding Position to Store... " + error;
                                                    console.log("Error occured when adding Position to Store!");
                                                    console.error(error);
                                                }

                                                */
        }
    }
};
</script>
