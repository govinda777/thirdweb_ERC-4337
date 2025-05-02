module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/step_definitions/**/*.ts'],
        format: ['@cucumber/pretty-formatter', 'html:cucumber-report.html'],
        paths: ['features/**/*.feature'],
        publishQuiet: true
    }
}; 