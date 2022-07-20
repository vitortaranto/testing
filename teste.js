
  $(document).ready(function () {
    var lastUrl = window.location.href

    new MutationObserver(() => {
      const url = window.location.href
      if (url !== lastUrl) {
        lastUrl = url
        onUrlChange()
      }
    }).observe(document, { subtree: true, childList: true })

    function onUrlChange() {
      removeBindings()
      applyScripts()
    }

    const removeBindings = () => {
      $(document).off("click", ".ant-form-horizontal button")
      $(document).off("click", "#btn-refer-and-win")
      $(document).off("click", ".ant-menu-item .ant-menu-title-content a")
      $(document).off("click", ".stage-talks .virtualized-card")
      $(document).off("click", ".recommend-talks .virtualized-card")
      $(document).off("click", ".next-talks .virtualized-card")
      $(document).off("click", ".previous-talks .virtualized-card")
      $(document).off("click", ".tail-talks .virtualized-card")
      $(document).off("click", ".collections .ant-btn")
      $(document).off("click", ".talk-actions-group .favorite-wrapper")
      $(document).off("click", ".talk-actions-group > .ant-btn-link")
      $(document).off("click", ".speaker-card")
      $(document).off("click", ".sponsor-card")
      $(document).off("click", "#btn-share-whatsapp")
      $(document).off("click", "#btn-share-facebook")
      $(document).off("click", "#btn-share-twitter")
      $(document).off("click", "#btn-share-linkedin")
      $(document).off("click", "#btn-share-email")
      $(document).off("click", ".feed-item")
      $(document).off("click", "#btn-logout")
      $(document).off("click", '.ant-modal-body button:contains("Deslogar")')
      $(document).off("click", ".slick-active")
      $(document).off("click", ".edition-talks .virtualized-card")
      $(document).off("click", ".awards-container button")
    }

    const changeMenuText = () => {
      if ($('[href="/home/event-info"]').length === 0) {
        setTimeout(() => {
          changeMenuText()
        }, 300)
      } else {
        $('[href="/home/event-info"]').text("Presencial")
      }
    }
    changeMenuText()

    const applyHash = () => {
      if (localStorage.getItem("@react-web-example:token")) {
        fetch("https://xp.tdscale.com.br/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("@react-web-example:token"),
          },
          body: JSON.stringify({
            query: `
                      query GetUserRegistrationData($event: ObjectID!) {
                      getUserRegistrationData(event: $event)
                      }
                      `,
            variables: {
              event: window.TD_EVENT_ID,
            },
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (
              result.data &&
              result.data.getUserRegistrationData &&
              result.data.getUserRegistrationData.customFields
            ) {
              const {
                customFields: { hash_document },
              } = result.data.getUserRegistrationData
              console.log(hash_document)
              window.baseDataAnalytics.user = {
                hash_id: hash_document,
              }
            }
          })
      }
    }
    applyHash()

    const applyScripts = () => {
      if (
        !window.location.href.includes("/home") &&
        localStorage.getItem("logoff")
      ) {
        localStorage.setItem("logoff", false)
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "popup_sair",

            action: "click_deslogar",

            label: "sucesso",
          },
        })
      }

      if (
        window.location.href.includes("/home") &&
        localStorage.getItem("@react-web-example:token") &&
        localStorage.getItem("@react-web-example:token") !==
          localStorage.getItem("lastTk")
      ) {
        localStorage.setItem(
          "lastTk",
          localStorage.getItem("@react-web-example:token")
        )
        applyHash()
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "login",

            action: "sucesso",

            label: "realizado",
          },
        })
      }

      $(document).on("click", ".ant-form-horizontal button", () => {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "login",
            action: "click",
            label: "enviar",
          },
        })
      })

      $(document).on(
        "click",
        ".ant-menu-item .ant-menu-title-content a",
        (i) => {
          window.dataLayer.push({
            event: "eventGA",
            eventGA: {
              category:
                "menu_" +
                decodeURI($(i.currentTarget).text())
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase(),

              action: "click",

              label: decodeURI($(i.currentTarget).text())
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase(),
            },
          })
        }
      )

      $(document).on("click", ".awards-container button", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_premios",

            action: "click_link",

            label: "compartilhar",
          },
        })
      })

      $(document).on("click", "#btn-refer-and-win", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_banner_indique",

            action: "click",

            label: "indique_ganhe",
          },
        })
      })

      $(document).on("click", ".stage-talks .virtualized-card", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_palcos",

            action: "click",

            label: decodeURI($(i.currentTarget.lastChild).text()),
          },
        })
      })

      $(document).on(
        "click",
        ".recommend-talks .virtualized-card",
        function (i) {
          window.dataLayer.push({
            event: "eventGA",
            eventGA: {
              category: "home_conteudos_sugeridos",

              action: "click",

              label: decodeURI($(i.currentTarget.lastChild).text()),
            },
          })
        }
      )

      $(document).on("click", ".edition-talks .virtualized-card", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_expert2021",

            action: "click",

            label: decodeURI($(i.currentTarget.lastChild).text()),
          },
        })
      })

      $(document).on("click", ".next-talks .virtualized-card", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_proximas_palestras",

            action: "click",

            label: decodeURI($(i.currentTarget.lastChild).text()),
          },
        })
      })

      $(document).on(
        "click",
        ".previous-talks .virtualized-card",
        function (i) {
          window.dataLayer.push({
            event: "eventGA",
            eventGA: {
              category: "home_palestras_anteriores",

              action: "click",

              label: decodeURI($(i.currentTarget.lastChild).text()),
            },
          })
        }
      )

      $(document).on("click", ".tail-talks .virtualized-card", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_trilhas",

            action: "click",

            label: decodeURI($(i.currentTarget.lastChild).text()),
          },
        })
      })

      $(document).on("click", ".collections .ant-btn", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_xp_store",

            action: "click",

            label: decodeURI(
              $(i.currentTarget.parentElement.firstChild).text()
            ),
          },
        })
      })

      $(document).on(
        "click",
        ".talk-actions-group .favorite-wrapper",
        function (i) {
          var talkTitle =
            i.currentTarget.parentNode.parentNode.parentNode.parentNode
              .parentNode.firstChild.firstChild.textContent
          window.dataLayer.push({
            event: "eventGA",
            eventGA: {
              category: "agenda_favorito",

              action: "click",

              label: decodeURI(talkTitle),
            },
          })
        }
      )

      $(document).on(
        "click",
        ".talk-actions-group > .ant-btn-link",
        function (i) {
          var talkTitle2 =
            i.currentTarget.parentNode.parentNode.parentNode.parentNode
              .parentNode.firstChild.firstChild.textContent
          window.dataLayer.push({
            event: "eventGA",
            eventGA: {
              category: "home_agenda",

              action: "click_" + i.currentTarget.href.split("/").pop(),

              label: talkTitle2,
            },
          })
        }
      )

      $(document).on("click", ".speaker-card", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_palestrantes",

            action: "click",

            label: $(i.currentTarget.childNodes[0].lastChild.firstChild).text(),
          },
        })
      })

      $(document).on("click", ".sponsor-card", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_patrocinio",

            action: "click_saiba_mais",

            label: i.currentTarget.getAttribute("data-sponsor-name"),
          },
        })
      })

      $(document).on("click", "#btn-share-whatsapp", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_premios",

            action: "click_whatsapp",

            label: "compartilhar",
          },
        })
      })

      $(document).on("click", "#btn-share-facebook", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_premios",

            action: "click_facebook",

            label: "compartilhar",
          },
        })
      })

      $(document).on("click", "#btn-share-twitter", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_premios",

            action: "click_twitter",

            label: "compartilhar",
          },
        })
      })

      $(document).on("click", "#btn-share-linkedin", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_premios",

            action: "click_linkedin",

            label: "compartilhar",
          },
        })
      })

      $(document).on("click", "#btn-share-email", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_premios",

            action: "click_email",

            label: "compartilhar",
          },
        })
      })

      $(document).on("click", ".feed-item", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "home_feed",

            action:
              "click_" + i.currentTarget.childNodes[1].getAttribute("href"),

            label: "post",
          },
        })
      })

      $(document).on("click", "#btn-logout", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "menu_sair",

            action: "click",

            label: "sair",
          },
        })
      })

      $(document).on("click", ".slick-active", function (i) {
        window.dataLayer.push({
          event: "eventGA",
          eventGA: {
            category: "banner",

            action: "click",

            label:
              i.currentTarget.childNodes[0].childNodes[0].getAttribute("href"),
          },
        })
      })

      $(document).on(
        "click",
        '.ant-modal-body button:contains("Deslogar")',
        function (i) {
          localStorage.setItem("logoff", true)
        }
      )
    }
    applyScripts()
  })