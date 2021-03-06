const _ = require('underscore');

const DrawCard = require('../../drawcard.js');

class Outwit extends DrawCard {
    setupCardAbilities() {
        this.action({
            title: 'Choose a character – send it home.',
            condition: () => this.game.currentConflict && this.hasCourtierPresent(),
            target: {
                activePromptTitle: 'Select a character',
                cardType: 'character',
                cardCondition: card => card.location === 'play area' && this.game.currentConflict.isParticipating(card) && card.controller !== this.controller && card.getPoliticalSkill() < this.getStrongestCourtier()
            },
            handler: context => {
                this.game.addMessage('{0} uses {1} to send {2} home', this.controller, this, context.target);
                this.game.currentConflict.sendHome(context.target);
            }
        });
    }

    hasCourtierPresent() {
        if(this.game.currentConflict.attackingPlayer === this.controller) {
            let present = _.size(_.filter(this.game.currentConflict.attackers, card => card.hasTrait('courtier')));
            if(present > 0) {
                return true;
            }
        }
        if(this.game.currentConflict.defendingPlayer === this.controller) {
            let present = _.size(_.filter(this.game.currentConflict.attackers, card => card.hasTrait('courtier')));
            if(present > 0) {
                return true;
            }
        }
        return false;
    }

    getStrongestCourtier() {
        if(this.game.currentConflict.attackingPlayer === this.controller) {
            let characters = _.filter(this.game.currentConflict.attackers, card => card.hasTrait('courtier'));
            let highestSkilledCharacter = _.max(characters, function(character) {
                return character.getPoliticalSkill();
            });
            return highestSkilledCharacter.getPoliticalSkill();
        }
        if(this.game.currentConflict.defendingPlayer === this.controller) {
            let characters = _.filter(this.game.currentConflict.attackers, card => card.hasTrait('courtier'));
            let highestSkilledCharacter = _.max(characters, function(character) {
                return character.getPoliticalSkill();
            });
            return highestSkilledCharacter.getPoliticalSkill();
        }
    }
}

Outwit.id = 'outwit';

module.exports = Outwit;
