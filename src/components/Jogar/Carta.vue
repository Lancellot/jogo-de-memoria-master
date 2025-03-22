<template>
    <div class="memory-card flip">
        <img class="front-face" src="img/aurelia.svg" alt="Aurelia" />
        <img class="back-face" src="img/js-badge.svg" alt="JS Badge" />
    </div>
</template>

<script>
export default {
    props: {
        carta: {
            id: Number,
            frente: String,
            verso: String,
            visivel: Boolean
        }
    },
    data() {
        return {
            hasFlippedCard: false,
            lockBoard: false,
            firstCard: '',
            secondCard: ''
        }
    },
    components: {
    },
    name: "Carta",
    methods: {
        flipCard() {
            if (this.lockBoard) return;
            if (this === this.firstCard) return;

            this.classList.add('flip');

            if (!this.hasFlippedCard) {
                this.hasFlippedCard = true;
                this.firstCard = this;
                return;
            }
            this.secondCard = this;
            this.checkForMatch();
        },
        checkForMatch() {
            let isMatch = this.firstCard.dataset.framework === this.secondCard.dataset.framework;

            isMatch ? this.disableCards() : this.unflipCards();
        },
        disableCards() {
            this.firstCard.removeEventListener('click', this.flipCard);
            this.secondCard.removeEventListener('click', this.flipCard);

            this.resetBoard();
        },
        unflipCards() {
            this.lockBoard = true;

            setTimeout(() => {
                this.firstCard.classList.remove('flip');
                this.secondCard.classList.remove('flip');

                this.resetBoard();
            }, 1500);
        },
        resetBoard() {
            [this.hasFlippedCard, this.lockBoard] = [false, false];
            [this.firstCard, this.secondCard] = [null, null];
        },
        shuffle() {
            this.cards.forEach(card => {
                let randomPos = Math.floor(Math.random() * 12);
                card.style.order = randomPos;
            });
        }
    },
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

</style>
