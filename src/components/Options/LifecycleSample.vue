<template>
<div class="text-xs-center">
    <v-dialog v-model="dialog" scrollable width="400">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="teal" block @click="startLifecycleDemo">Start Demo</v-btn>
        </template>
        <v-card outlined>
            <v-card-title class="teal">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline">Lifecycle Demo</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-card-title>

            <v-card-text>
                <br />
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
                                    [-122.43704795837402, 37.79811961477822],
                                    [-122.43464469909667, 37.79811961477822],
                                    [-122.43464469909667, 37.800188134708165],
                                    [-122.43704795837402, 37.800188134708165],
                                    [-122.43704795837402, 37.79811961477822]
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
                                    [-122.43683338165283, 37.798458720375685],
                                    [-122.4093246459961, 37.798458720375685],
                                    [-122.4093246459961, 37.79998467630002],
                                    [-122.43683338165283, 37.79998467630002],
                                    [-122.43683338165283, 37.798458720375685]
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
                                    [-122.41177082061768, 37.78452019757326],
                                    [-122.40936756134033, 37.78452019757326],
                                    [-122.40936756134033, 37.799916856706105],
                                    [-122.41177082061768, 37.799916856706105],
                                    [-122.41177082061768, 37.78452019757326]
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
                                    [-122.43378639221191, 37.78465586496683],
                                    [-122.40958213806151, 37.78465586496683],
                                    [-122.40958213806151, 37.78618210598413],
                                    [-122.43378639221191, 37.78618210598413],
                                    [-122.43378639221191, 37.78465586496683]
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
                                    [-122.43352890014648, 37.78499503236122],
                                    [-122.43134021759032, 37.78499503236122],
                                    [-122.43134021759032, 37.79598321371842],
                                    [-122.43352890014648, 37.79598321371842],
                                    [-122.43352890014648, 37.78499503236122]
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
                                    [-122.43348598480225, 37.79401631367505],
                                    [-122.4125862121582, 37.79401631367505],
                                    [-122.4125862121582, 37.79571192027404],
                                    [-122.43348598480225, 37.79571192027404],
                                    [-122.43348598480225, 37.79401631367505]
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
                            altitude_value: 1000,
                            vertical_reference: "W84",
                            units_of_measure: "FT",
                            source: "OTHER"
                        },
                        operation_geography: {
                            type: "Polygon",
                            coordinates: [
                                [
                                    [-122.4146032333374, 37.79415196363509],
                                    [-122.41271495819092, 37.79415196363509],
                                    [-122.41271495819092, 37.79561018497552],
                                    [-122.4146032333374, 37.79561018497552],
                                    [-122.4146032333374, 37.79415196363509]
                                ]
                            ]
                        }
                    }
                ]
            }],
            samplePositions: [{
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 100,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.43588924407958, 37.79917083706328]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 700,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.43515968322752, 37.79927256745822]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.43382930755614, 37.79927256745822]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.43095397949219, 37.79934038764369]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.42717742919922, 37.79934038764369]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.42421627044679, 37.79927256745822]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.41932392120361, 37.79927256745822]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.41421699523924, 37.79927256745822]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.41052627563477, 37.79917083706328]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.41065502166748, 37.79564409675727]
                    }
                },
                {
                    gufi: "21f12af5-bfef-426a-8ab7-f1241a6ce714",
                    altitude_gps_wgs84_ft: 750,
                    uss_name: "exige.archit.xyz",
                    location: {
                        type: "Point",
                        coordinates: [-122.41065502166748, 37.792490234462946]
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
        }
    }
};
</script>
