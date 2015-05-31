module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        //Installation des Vendors
        bower: {
            install: {
                options: {
                    copy: false
                }
            }
        },
        //Controle de qualité
        jshint: {
            allFiles: [
                'app/**/*.js',
                '!app/templates.js',
                '!app/vendors/**/*.js'
            ],
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: [
                    'app/**/*.css',
                    '!app/vendors/**/*.css',
                    '!app/views/musee/components/amListMusee/amListMusee.css'
                ]
            }
        },
        //Optimisation
        ngtemplates: {
            AnnuaireMuseeApp: {
                src: ['app/**/*.html'],
                dest: 'app/templates.js',
                standalone: true,
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        //Concaténation de fichier
        concat: {
            css: {
                src: [
                    'app/app.css',
                    'app/**/*.css'
                ],
                dest: 'dist/style.css'
            },
            'js': {
                src: [
                    "app/vendors/js/jquery.min.js",
                    "app/vendors/js/angular.min.js",
                    "app/app.js",
                    "app/**/*.js"
                ],
                dest: 'dist/script.js'
            }
        },
        //Optimisation Angular -
        //Add, remove and rebuild angularjs dependency injection annotations
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app1: {
                files: {
                    'dist/script.js': ['dist/script.js']
                }
            }
        },
        //Optimisation CSS
        //Parse CSS and add vendor-prefixed CSS properties
        autoprefixer: {
            single_file: {
                src: 'dist/style.css',
                dest: 'dist/style.css'
            }
        },
        //Minification CSS et JS
        cssmin: {
            css: {
                src: 'dist/style.css',
                dest: 'dist/style.min.css'
            }
        },
        uglify: {
            js: {
                options: {
                    sourceMap: false,
                    sourceMapName: 'dist/script.min.js.map'
                },
                files: {
                    'dist/script.min.js': ['dist/script.js']
                }
            }
        },
        //Copies de fichiers
        copy: {
            bowerCSS: {
                src: [
                    'tmp/components/**/font-awesome.min.css',
                    'tmp/components/**/bootstrap.min.css',
                    'tmp/components/**/ui-grid.min.css',
                    'tmp/components/**/animate.min.css'
                ],
                dest: 'app/vendors/css/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
            bowerJS: {
                src: [

                    'tmp/components/**/angular*.min.js',
                    'tmp/components/**/ui-bootstrap.js',
                    'tmp/components/**/ui-grid.min.js',
                    'tmp/components/**/sticky.min.js',
                    'tmp/components/angular-i18n/angular-locale_fr-fr.js'

                ],
                dest: 'app/vendors/js/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
            bowerFONT: {
                src: [
                    'tmp/components/**/FontAwesome.otf',
                    'tmp/components/**/fontawesome-webfont.eot',
                    'tmp/components/**/fontawesome-webfont.svg',
                    'tmp/components/**/fontawesome-webfont.ttf',
                    'tmp/components/**/fontawesome-webfont.woff',
                    'tmp/components/**/fontawesome-webfont.woff2',
                    'tmp/components/**/ui-grid.svg',
                    'tmp/components/**/ui-grid.ttf',
                    'tmp/components/**/ui-grid.woff'
                ],
                dest: 'fonts/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
            uiGridFONT: {
                src: [
                    'tmp/components/**/ui-grid.svg',
                    'tmp/components/**/ui-grid.ttf',
                    'tmp/components/**/ui-grid.woff'
                ],
                dest: 'dist/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            },
            genLivrable: {
                files: [
                    {
                        src: ['img/*'],
                        dest: 'tmp/livrable/img/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        src: ['dist/*'],
                        dest: 'tmp/livrable/dist/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        src: ['fonts/*'],
                        dest: 'tmp/livrable/fonts/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        src: ['app/index.html'],
                        dest: 'tmp/livrable/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }
                ]

            }
        },
        //Tâches à réaliser en cas de modification
        watch: {
            html: {
                files: ['app/**/*.html'],
                tasks: ['ngtemplates']
            },
            css: {
                files: ['app/**/*.css'],
                tasks: ['concat:css', 'autoprefixer', 'cssmin', "csslint", 'clean:end-build']
            },
            js: {
                files: ['app/**/*.js'],
                tasks: ['concat:js', 'ngAnnotate', 'uglify', 'jshint', 'clean:end-build'],
                options: {
                    interrupt: true
                }
            },
            livereload: {
                files: ['dist/*.min.*'],
                options: {livereload: true}
            }
        },
        //Nettoyage
        clean: {
            dist: ["dist/"],
            "end-build": ["dist/script.js", 'dist/style.css'],
            vendors: ["app/vendors"]
        },
        //Démarrage de serveur
        express: {
            dev: {
                options: {
                    script: 'server.js',
                    spawn: false
                }
            }
        },
        sro_create_angular_components: {
            AnnuaireMuseeApp: {
                views: [
                    "app/views/home",
                    "app/views/musee",
                    "app/views/categorie"
                ],
                directives: [
                    "app/components/amEntete",
                    "app/components/amMenu",
                    "app/views/musee/components/amListMusee",
                    "app/views/musee/components/amEditMusee",
                    "app/views/categorie/components/amListCategorie",
                    "app/views/categorie/components/amEditCategotie"
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'clean:dist',
        'concat',
        'autoprefixer',
        'ngtemplates',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'clean:end-build',
        'jshint',
        'csslint',
        "copy:uiGridFONT"
    ]);

    grunt.registerTask('default + express + watch', [
        'default',
        'express',
        'watch'
    ]);

    grunt.registerTask('bower-task', [
        "bower",
        "clean:vendors",
        "copy:bowerCSS",
        "copy:bowerJS",
        "copy:bowerFONT",
        "copy:uiGridFONT"
    ]);


    grunt.registerTask('MEP', [
        "bower-task", "default", "copy:genLivrable"
    ]);

    grunt.registerTask('generate files', [
        'sro_create_angular_components'
    ]);


};
